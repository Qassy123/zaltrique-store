import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const name = String(body.name || "").trim();
    const description = String(body.description || "").trim();
    const price = Number(body.price);
    const images = Array.isArray(body.images) ? body.images.slice(0, 5) : [];
    const image = String(body.image || images[0] || "").trim();

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    if (!name || !description || !price || !image || images.length === 0) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        image,
        images,
      },
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}