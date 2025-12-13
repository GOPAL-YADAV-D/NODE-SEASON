const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(pid, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalprice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === pid
      );
      const existingProduct = cart.products[existingProductIndex];

      let updateProduct;
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.quantity += 1;
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id: pid, quantity: 1 };
        cart.products.push(updateProduct);
      }

      cart.totalprice += productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
