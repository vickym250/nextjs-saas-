require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI .env file mein nahi mila.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");

  const db = mongoose.connection.db;
  const users = db.collection("users");

  const email = "admin@gmial.com";
  const password = "admin";

  // Check whether the Super Admin already exists
  const existing = await users.findOne({
    email: email.toLowerCase(),
    role: "SUPER_ADMIN",
  });

  if (existing) {
    console.log("Super Admin already exists.");

    // Ensure the account is active and has no school assigned
    await users.updateOne(
      { _id: existing._id },
      {
        $set: {
          isActive: true,
          schoolId: null,
          updatedAt: new Date(),
        },
      }
    );

    console.log("Existing Super Admin checked.");
    console.log("Email:", existing.email);
    console.log("Password was not changed.");

    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await users.insertOne({
    name: "Super Admin",
    email: email.toLowerCase(),
    passwordHash,
    role: "SUPER_ADMIN",
    schoolId: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("Super Admin created successfully.");
  console.log("Email:", email);
  console.log("Temporary password:", password);
}

main()
  .catch((error) => {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });