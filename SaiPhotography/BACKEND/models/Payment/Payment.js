// paymentModel.js

const mongoose = require('mongoose');
const Booking = require('../Schedule/Booking');



const paymentSchema = new mongoose.Schema({
   
    cash: String,
    bank: String,
    date: String,
    image: String,
   
    Email: {
        type: String,
       
    },
    bookingId:{
        type:String,
        ref:Booking
    } 

    
});

const PaymentModel = mongoose.model('Pays', paymentSchema);

module.exports = PaymentModel;
