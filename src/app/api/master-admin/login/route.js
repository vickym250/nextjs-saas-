
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    const secret = process.env.AUTH_SECRET;

    if (!secret || secret.length < 32) {
      console.error("AUTH_SECRET is missing or too short");
      return NextResponse.json(
        { success: false, message: "Server authentication configuration error." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email aur password dono zaroori hain." },
        { status: 400 }
      );
    }

    await dbConnect();

    const admin = await User.findOne({
      email,
      role: "SUPER_ADMIN",
      isActive: true,
    }).select("+passwordHash");

    if (!admin || !admin.passwordHash) {
      return NextResponse.json(
        { success: false, message: "Email ya password galat hai." },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { success: false, message: "Email ya password galat hai." },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      role: "SUPER_ADMIN",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(String(admin._id))
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: String(admin._id),
        email: admin.email,
        role: admin.role,
      },
    });

    // Browser mein secure HTTP-only cookie set hogi.
    response.cookies.set("master_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Master Admin login error:", error);

    return NextResponse.json(
      { success: false, message: "Login ke dauran server error aaya." },
      { status: 500 }
    );
  }
}
