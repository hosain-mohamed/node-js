// Category model
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    __v: { type: Number, select: false },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
