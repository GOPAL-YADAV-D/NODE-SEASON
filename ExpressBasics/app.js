const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');

const rootDir = require('./util/rootPath');
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.use(express.static(path.join(rootDir, 'public')));

app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'main-layout', layoutsDir: 'views/layouts/' }));
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminData.routes);
app.use(shopRouter);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
})

app.listen(3000);