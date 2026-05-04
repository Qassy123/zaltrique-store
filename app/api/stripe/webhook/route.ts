import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return new NextResponse("Missing Stripe signature", { status: 400 });
    }

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return new NextResponse("Missing webhook secret", { status: 500 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return new NextResponse("Webhook signature verification failed", {
        status: 400,
      });
    }

    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId found in Stripe metadata");
      return NextResponse.json({ received: true });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      console.error("Order not found:", orderId);
      return NextResponse.json({ received: true });
    }

    if (order.confirmationEmailSent) {
      return NextResponse.json({ received: true });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "paid",
        status: "processing",
        confirmationEmailSent: true,
      },
    });

    const itemRows = order.orderItems
      .map(
        (item) => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
              ${item.name} × ${item.quantity}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; text-align: right;">
              £${(item.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        `
      )
      .join("");

    await resend.emails.send({
      from:
        process.env.ORDER_EMAIL_FROM ||
        "Zaltrique <orders@zaltriquehq.co.uk>",
      to: order.email as string,
      subject: "Your Zaltrique order is confirmed",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 24px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; padding: 28px; border-radius: 12px;">
            <h1 style="margin: 0 0 16px; color: #111111;">Order confirmed</h1>

            <p style="color: #333333;">Hi ${order.fullName || "there"},</p>

            <p style="color: #333333;">
              Thanks for shopping with Zaltrique. Your payment was successful and your order is now being processed.
            </p>

            <p style="color: #333333;">
              <strong>Order ID:</strong> ${order.id}
            </p>

            <h2 style="margin-top: 28px; color: #111111;">Order Summary</h2>

            <table style="width: 100%; border-collapse: collapse; color: #333333;">
              ${itemRows}
              <tr>
                <td style="padding: 14px 0; font-weight: bold;">Total</td>
                <td style="padding: 14px 0; font-weight: bold; text-align: right;">
                  £${order.total.toFixed(2)}
                </td>
              </tr>
            </table>

            <h2 style="margin-top: 28px; color: #111111;">Shipping Address</h2>

            <p style="color: #333333; line-height: 1.5;">
              ${order.fullName || ""}<br />
              ${order.addressLine1 || ""}<br />
              ${order.addressLine2 ? `${order.addressLine2}<br />` : ""}
              ${order.city || ""}<br />
              ${order.postcode || ""}<br />
              ${order.country || "United Kingdom"}
            </p>

            <p style="margin-top: 28px; color: #333333;">
              We’ll email you again when your order ships.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent for order:", order.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("STRIPE WEBHOOK ERROR:", error);
    return new NextResponse("Webhook failed", { status: 500 });
  }
}