
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function getMasterAdmin() {
  try {
    const secret = process.env.AUTH_SECRET;

    if (!secret || secret.length < 32) {
      console.error("AUTH_SECRET missing or invalid");
      return null;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("master_session")?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { algorithms: ["HS256"] }
    );

    if (!payload.sub || payload.role !== "SUPER_ADMIN") {
      return null;
    }

    await dbConnect();

    const admin = await User.findById(payload.sub)
      .select("_id email role isActive")
      .lean();

    if (!admin || admin.role !== "SUPER_ADMIN" || admin.isActive !== true) {
      return null;
    }

    return {
      id: String(admin._id),
      email: admin.email,
      role: admin.role,
    };
  } catch (error) {
    // Missing, invalid, or expired token
    if (process.env.NODE_ENV !== "production") {
      console.error("Master Admin session check failed:", error.message);
    }

    return null;
  }
}
