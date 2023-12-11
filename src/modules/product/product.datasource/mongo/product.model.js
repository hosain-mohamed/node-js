import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: { type: Number, required: true },
    __v: { type: Number, select: false },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
