const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _logger = require('morgan');
const Product = require('../models/product');


//Get All Products
router.get('/', (req,res,next)=> {
    Product.find()
    .exec()
    .then(doc => res.status(200).json(doc))
    .catch(err => {
        console.log(err);
        res.status(500).json({message : 'An Error has Occurred, Unable to Fetch Data at this time'})
    });
});


//Create a new Product
router.post('/', (req,res,next)=> {   
    var product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name :req.body.name,
        type : req.body.type,
        productYear : req.body.productYear
    });
    product.save().then(result =>{
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(202).json({
        message :'Handling POST Requests',
        createdProduct : product
    });
});


//Get a Specific Product
router.get('/:productId',(req,res,next)=> {  
    const id = req.params.productId;
    console.log(id);
    Product.findById(id)
    .exec()
    .then(doc => {console.log(doc);
        if(doc){  
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({message : 'No Matching Records'}); 
        }
    })
    .catch(err => { 
        console.log(err);
        res.status(500).json({error : err});
    });
});


//Update a Product
router.patch('/:productId',(req,res,next)=> {
    const productId = req.params.productId;
    console.log(productId);
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:productId},{$set : updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message : 'Unable to Update the Product, Please try again later'
        }) 
    });
});  
          

//Remove a product
router.delete('/:productId',(req,res,next)=> {
    const productId = req.params.productId;
    Product.remove({_id : productId})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            message : error
        });
    });  
       
});


module.exports = router;