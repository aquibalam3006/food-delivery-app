import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "./models/userModel.js";

// 🔥 DIRECT DB CONNECT (same as your db.js)
await mongoose.connect("mongodb+srv://mdaquib3006:78707560@cluster0.ecuubsw.mongodb.net/fooddel");

console.log("DB connected for admin ✅");

// 👉 YOUR ADMIN DETAILS
const name = "AQUIB";
const email = "mdaquib3006@gmail.com";
const password = "aquib@2430";

const createAdmin = async () => {
  try {

    const exists = await UserModel.findOne({ email });

    if (exists) {
      console.log("❌ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit();
  }
};

createAdmin();