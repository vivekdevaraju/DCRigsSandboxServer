const express = require('express');
const app = express();
const _logger = require('morgan');
const _bodyParer = require('body-parser');

const productRoutes = require('./api/routes/products');
const bookingRoutes = require('./api/routes/bookings');


app.use(_logger('dev'));
app.use(_bodyParer.urlencoded({extended : false}));
app.use(_bodyParer.json());


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