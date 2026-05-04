import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.userId;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("User orders error:", error);

    return NextResponse.json(
      { error: "Failed to load orders." },
      { status: 500 }
    );
  }
}