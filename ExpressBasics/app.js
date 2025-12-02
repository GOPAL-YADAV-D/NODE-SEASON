const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Staring the First Middleware');
    next();
});

app.use((req, res, next) => {
    console.log('In the Second Middleware');
    res.send('<h1>Hello from Express.js Server!</h1>');
}); 

app.listen(3000);