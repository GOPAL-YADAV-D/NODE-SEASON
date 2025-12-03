const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const rootDir = require('./util/rootPath');
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminData.routes);
app.use(shopRouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

app.listen(3000);