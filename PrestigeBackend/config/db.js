import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mdaquib3006:78707560@cluster0.ecuubsw.mongodb.net/fooddel");
    console.log("DB connected ✅");
  } catch (error) {
    console.log("DB error ❌", error.message);
  }
};