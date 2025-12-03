// Built In Modules
const path = require('path');

// 3rd Party Modules
const express = require('express');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');

// Custom Modules
const rootDir = require('./util/rootPath');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');


// App Initialization
const app = express();

// Middleware & Settings
app.use(express.static(path.join(rootDir, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars Setup
app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'main-layout', layoutsDir: 'views/layouts/' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);