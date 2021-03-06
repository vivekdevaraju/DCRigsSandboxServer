const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) =>{
res.status(200).json({
    message:'bookings were fetched'
});
});

router.post('/',(req,res,next) =>{
    const booking = {
        userName : req.body.userName,
        userEmail : req.body.userEmail
    };
            res.status(202).json({
            message:'bookings were created',
            createdBooking : booking
        });
});


router.get('/:bookingId',(req,res,next) =>{
    res.status(200).json({
        message:'booking with Specific Id was fetched',
        orderId : req.params.bookingId
    });
});

router.delete('/:bookingId',(req,res,next) =>{
    res.status(202).json({
        message:'bookings were deleted',
        orderId : req.params.bookingId
    });
});
module.exports = router;