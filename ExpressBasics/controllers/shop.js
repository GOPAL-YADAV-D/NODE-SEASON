const Product = require("../models/product");

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "All Products",
      products: products,
      hasProducts: products.length > 0 || 0,
      path: "/products",
      isProducts: true,
      productCss: true,
    });
  });
};

const getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Gopi-Shop",
      products: products,
      hasProducts: products.length > 0 || 0,
      path: "/",
      isShop: true,
      productCss: true,
    });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    isCart: true,
    path: "/cart",
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    isCheckout: true,
    path: "/checkout",
  });
};

module.exports = {
  getProducts: getProducts,
  getIndex: getIndex,
  getCart: getCart,
  getCheckout: getCheckout,
};
