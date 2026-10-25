
import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";
import School from "@/models/School";



const schoolSchema = z.object({
  name: z.string().trim().min(2).max(150),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  primaryDomain: z
    .string()
    .trim()
    .toLowerCase()
    .min(4)
    .max(253),

  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().max(20).optional(),
  address: z.string().trim().max(500).optional(),
  logo: z.string().trim().max(1000).optional(),

  subscriptionPlan: z
    .enum(["basic", "standard", "premium"])
    .optional(),
});

function normalizeDomain(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\.$/, "");
}

function isValidHostname(hostname) {
  if (
    hostname.includes("://") ||
    hostname.includes("/") ||
    hostname.includes(":") ||
    hostname.includes("@") ||
    hostname.includes("..")
  ) {
    return false;
  }

  const labels = hostname.split(".");

  if (labels.length < 2) return false;

  return labels.every(
    (label) =>
      label.length >= 1 &&
      label.length <= 63 &&
      /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)
  );
}

export async function POST(request) {
  try {
    // Temporary protection for Postman testing.
    const expectedKey = process.env.MASTER_API_KEY;
    const providedKey = request.headers.get("x-master-api-key");

    if (!expectedKey || providedKey !== expectedKey) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = schoolSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          errors: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const primaryDomain = normalizeDomain(data.primaryDomain);

    if (!isValidHostname(primaryDomain)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Enter a valid domain hostname without https:// or a path",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await School.findOne({
      $or: [
        { slug: data.slug },
        { primaryDomain },
      ],
    }).lean();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            existing.slug === data.slug
              ? "This school slug already exists"
              : "This domain is already registered",
        },
        { status: 409 }
      );
    }

    const school = await School.create({
      name: data.name,
      slug: data.slug,
      primaryDomain,
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      logo: data.logo || "",
      subscriptionPlan: data.subscriptionPlan || "basic",
      status: "pending",
      domainVerified: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "School created successfully",
        school: {
          id: school._id,
          name: school.name,
          slug: school.slug,
          primaryDomain: school.primaryDomain,
          domainVerified: school.domainVerified,
          status: school.status,
          subscriptionPlan: school.subscriptionPlan,
          createdAt: school.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "School slug or domain already exists",
        },
        { status: 409 }
      );
    }

    console.error("Create school error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
