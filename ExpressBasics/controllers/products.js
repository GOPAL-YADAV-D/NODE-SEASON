const products = [];

const getAddProduct = (req, res, next) => {
    res.render('add-product', { 
        pageTitle: 'Add Product',
        formsCss: true,
        productCss: true,
        isAddProduct: true
    });
};

const postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
}

const getProducts = (req, res, next) => {
    res.render('shop', {
        pageTitle: 'Shop',
        products: products,
        hasProducts: products.length > 0,
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