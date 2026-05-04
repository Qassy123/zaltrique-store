import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { orderNumber, email, issue } = body;

    if (!orderNumber || !email || !issue) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    await prisma.complaint.create({
      data: {
        orderNumber,
        email,
        issue,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("COMPLAINT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to submit complaint" },
      { status: 500 }
    );
  }
}