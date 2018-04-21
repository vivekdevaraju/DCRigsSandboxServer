const express = require('express');


const router = express.Router();

router.get('/', (req,res,next)=> {
    res.status(200).json({
        message :'Handling GET Requests'
    });
});

router.post('/', (req,res,next)=> {
    res.status(200).json({
        message :'Handling POST Requests'
    });
});

router.get('/:productId',(req,res,next)=> {  
    const id = req.params.productId;
    if(id === 'special') {
        res.status(200).json({
            message : 'You discovered the special ID',
            id : id
        });
    }
    else
    {
        res.status(200).json({
            message : 'You Passed an ID'
        });
    }
});

router.patch('/:productId',(req,res,next)=> {  
        res.status(200).json({
            message : 'Updated Product'
        });   
});


router.delete('/:productId',(req,res,next)=> {  
    res.status(200).json({
        message : 'Deleted Product'
    });   
});
module.exports = router;