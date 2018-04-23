const mongoose = require('mongoose');

// Generate Schema

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{
        type : String,
        required : true
    },
    type:{
        type : String
    },
    productYear:{
        type : String
    }
});

module.exports = mongoose.model('Product', productSchema);
