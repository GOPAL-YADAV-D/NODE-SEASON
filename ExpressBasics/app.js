const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log("This Always Runs!");
    next();
});

app.use('/add_product',(req, res, next) => {
    console.log('Staring the First Middleware');
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.use('/',(req, res, next) => {
    console.log('In the Second Middleware');
    res.send('<h1>Hello from Express.js Server!</h1>');
}); 

app.listen(3000);