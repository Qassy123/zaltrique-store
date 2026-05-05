import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const description = String(body.description || "").trim();
    const price = Number(body.price);
    const images = Array.isArray(body.images) ? body.images.slice(0, 5) : [];
    const image = String(body.image || images[0] || "").trim();

    if (!name || !description || !price || !image || images.length === 0) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
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
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}