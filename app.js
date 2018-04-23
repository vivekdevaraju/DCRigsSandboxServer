const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const bookingRoutes = require('./api/routes/bookings');


app.use('/products', productRoutes);
app.use('/bookings', bookingRoutes);


module.exports = app;