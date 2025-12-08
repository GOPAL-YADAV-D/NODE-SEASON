const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/rootPath');
const products = require('../controllers/products');

module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
        const p = path.join(rootDir, 'data', 'products.json');
        let products = [];
        fs.readFile(p, (err, fileContent) => {
            if(!err){
                products.JSON.parse(fileContent);
            }

            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb){
        const p = path.join(rootDir, 'data', 'products.json');
        
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
}