import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const items = body.items || [];
    const email = body.email?.trim().toLowerCase() || "";
    const fullName = body.fullName?.trim() || "";
    const addressLine1 = body.addressLine1?.trim() || "";
    const addressLine2 = body.addressLine2?.trim() || "";
    const city = body.city?.trim() || "";
    const postcode = body.postcode?.trim().toUpperCase() || "";
    const country = "United Kingdom";
    const user = body.user || null;

    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!email || !fullName || !addressLine1 || !city || !postcode) {
      return NextResponse.json(
        { error: "Missing checkout details" },
        { status: 400 }
      );
    }

    const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;

    if (!ukPostcodeRegex.test(postcode)) {
      return NextResponse.json(
        { error: "Invalid UK postcode" },
        { status: 400 }
      );
    }

    const total = items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        email,
        total,
        fullName,
        addressLine1,
        addressLine2,
        city,
        postcode,
        country,
        userId: user?.id || null,
        paymentStatus: "unpaid",
        status: "pending",
        orderItems: {
          create: items.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      client_reference_id: order.id,

      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,

      metadata: {
        orderId: order.id,
        email,
        fullName,
        postcode,
        country,
      },
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        stripeSessionId: session.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);

    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}