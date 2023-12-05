import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  __v: { type: Number, select: false },

});

const productModel = mongoose.model("product", productSchema);

export default productModel;
