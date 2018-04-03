var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
//var index = require('./routes/index');
var router = require('../routes/router');
var users = require('../routes/users');
 
const app  = require('express')()
      ,bodyParser = require('body-parser')
      ,apiRoutes   = require('../routes/api.js')
      ,config  = require('../config').app;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*configure app to use body-parser*/
app.use(bodyParser.urlencoded({extended:true}))      
app.use(bodyParser.json())    

/*configuring our application routes*/
app.use('/api/v1', apiRoutes);

