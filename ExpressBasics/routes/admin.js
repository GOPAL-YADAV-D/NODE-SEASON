const path = require('path');

const express = require('express');

const rootDir = require('../util/rootPath');

const router = express.Router();

const products = [];

router.get('/add-product',(req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { 
        pageTitle: 'Add Product',
        formsCss: true,
        productCss: true,
        isAddProduct: true
    });
});

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
})

module.exports = {
    routes: router,
    products: products
};