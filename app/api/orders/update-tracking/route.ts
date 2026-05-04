import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderId = body.orderId;
    const status = body.status;
    const trackingCode = body.trackingCode?.trim();

    if (!orderId || !status) {
      return Response.json(
        { success: false, error: "Missing order details" },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return Response.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        trackingCode: trackingCode || null,
      },
    });

    const shouldSendTrackingEmail =
      status === "shipped" &&
      trackingCode &&
      existingOrder.trackingCode !== trackingCode &&
      updatedOrder.email;

    if (shouldSendTrackingEmail) {
      const trackingUrl = `https://www.royalmail.com/track-your-item#/tracking-results/${trackingCode}`;

      await resend.emails.send({
        from:
          process.env.ORDER_EMAIL_FROM ||
          "Zaltrique <orders@zaltriquehq.co.uk>",
        to: updatedOrder.email as string,
        subject: "Your Zaltrique order has shipped",
        html: `
          <div style="font-family: Arial, sans-serif; background: #f6f6f6; padding: 24px;">
            <div style="max-width: 640px; margin: 0 auto; background: #ffffff; padding: 28px; border-radius: 12px;">
              <h1 style="margin: 0 0 16px; color: #111;">Your order has shipped</h1>

              <p style="color: #333;">Hi ${updatedOrder.fullName || "there"},</p>

              <p style="color: #333;">
                Your Zaltrique order is now on its way.
              </p>

              <p style="color: #333;">
                <strong>Order ID:</strong> ${updatedOrder.id}
              </p>

              <p style="color: #333;">
                <strong>Tracking number:</strong> ${trackingCode}
              </p>

              <p style="margin: 24px 0;">
                <a
                  href="${trackingUrl}"
                  target="_blank"
                  style="display: inline-block; background: #111; color: #ffffff; padding: 12px 18px; border-radius: 999px; text-decoration: none;"
                >
                  Track with Royal Mail
                </a>
              </p>

              <p style="color: #333;">
                Thank you for shopping with Zaltrique.
              </p>
            </div>
          </div>
        `,
      });
    }

    return Response.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error("UPDATE TRACKING ERROR:", error);

    return Response.json(
      { success: false, error: error?.message || "Failed to update order" },
      { status: 500 }
    );
  }
}