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

  static deleteProduct(pid, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        const cart = JSON.parse(fileContent);
        const product = cart.products.find((prod) => prod.id === pid);
        if (!product) {
          return;
        }

        const productQty = product.quantity;
        cart.products = cart.products.filter((prod) => prod.id !== pid);
        cart.totalprice = cart.totalprice - productPrice * productQty;

        fs.writeFile(p, JSON.stringify(cart), (err) => {
          console.log(err);
        });
      }
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb(null);
      }
      const cart = JSON.parse(fileContent);
      cb(cart);
    });
  }
};
