const express = require('express');
const app = express();
const _logger = require('morgan');
const _bodyParsrer = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const bookingRoutes = require('./api/routes/bookings');


//Mongo DB Connection
mongoose.connect('mongodb://localhost/TestAppDB');
//mongoose.connect('mongodb://dcrigsadmin:dcrigsadmin@dcsandboxdb-shard-00-00-dqoch.mongodb.net:27017,dcsandboxdb-shard-00-01-dqoch.mongodb.net:27017,dcsandboxdb-shard-00-02-dqoch.mongodb.net:27017/test?ssl=true&replicaSet=DCSandboxDB-shard-0&authSource=admin');
var db = mongoose.connection;

db.on('error', function(error) {
    console.error('Database connection error:', error);
  });
  
db.once('open', function() {
    console.log('Database connected');
  });


app.use(_logger('dev'));
app.use(_bodyParsrer.urlencoded({extended : false}));
app.use(_bodyParsrer.json());


app.use((req,res,next) =>{
    res.header("Access-Allow-Control-Origin","*");
    res.header("Access-Allow-Control-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Allow-Control-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
//Routes
app.use('/products', productRoutes);
app.use('/bookings', bookingRoutes);

app.use((req,res,next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        message : error.message
    });
});


module.exports = app;