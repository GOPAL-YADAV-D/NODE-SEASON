const path = require('path');

const express = require('express');

const rootDir = require('../util/rootPath');
const adminData = require('./admin');

const router = express.Router();

router.get('/',(req, res, next) => {
    // console.log('shop.js', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {
        pageTitle: 'Shop',
        products: adminData.products,
        hasProducts: adminData.products.length > 0,
        path: '/',
        isShop: true,
        productCss: true
    });

}); 

module.exports = router;