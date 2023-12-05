import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

// use env
dotenv.config();

const baseUrl = `${process.env.BASE_URL}`;

const defaultAvatar = path.join(baseUrl, "uploads", "avatar.png");

const userSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  avatar: { type: String, default: defaultAvatar },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
