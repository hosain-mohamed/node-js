import fs from "fs";
const productsPath = "./products.json";

export const getProducts = () => {
  const products = fs.existsSync(productsPath)
    ? JSON.parse(fs.readFileSync(productsPath, "utf8"))
    : [];
  return products;
};

export function writeProducts(products, onError, success) {
  fs.writeFile(productsPath, JSON.stringify(products), (err) => {
    if (err) {
      return onError();
    }
    success();
  });
}
