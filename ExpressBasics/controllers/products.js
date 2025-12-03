const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    res.render('add-product', { 
        pageTitle: 'Add Product',
        formsCss: true,
        productCss: true,
        isAddProduct: true
    });
};

const postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

const getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
        pageTitle: 'Shop',
        products: products,
        hasProducts: products.length > 0 || 0,
        path: '/',
        isShop: true,
        productCss: true
    });
}

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts
}