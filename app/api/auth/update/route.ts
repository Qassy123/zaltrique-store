import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const id = body.id;
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!id || !firstName || !lastName || !email) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const data: any = {
      firstName,
      lastName,
      email,
    };

    if (password && password.length > 0) {
      if (password.length < 6) {
        return Response.json(
          { success: false, error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }

      data.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return Response.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    });
  } catch (err: any) {
    console.error("UPDATE ACCOUNT ERROR:", err);

    return Response.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}