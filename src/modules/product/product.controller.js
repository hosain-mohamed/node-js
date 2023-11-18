import di from "../../../di.js";
const ProductRepository = di.productRepository;

// get products
export async function getProducts(req, res) {
  const products = await ProductRepository.getProducts(req, res);
  if (!products.length) {
    return res.json({ message: "No Products Found", products: products });
  }
  return res.json({ products: products });
}

// product details
export async function getProduct(req, res) {
  const product = await ProductRepository.getProduct(req, res);
  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  return res.json({ product: product });
}

// add product
export async function addProduct(req, res) {
  const newProduct = await ProductRepository.addProduct(req, res);
  res
    .status(201)
    .json({ message: "Product Added Successfully", product: newProduct });
}

// update product
export async function updateProduct(req, res) {
  const updatedProduct = await ProductRepository.updateProduct(req, res);
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  res.json({
    message: "Product Updated Successfully",
    product: updatedProduct,
  });
}

// delete product
export async function deleteProduct(req, res) {
  const deletedProduct = await ProductRepository.deleteProduct(req, res);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product Not Found" });
  } else
    res.json({
      message: "Product Deleted Successfully",
    });
}
