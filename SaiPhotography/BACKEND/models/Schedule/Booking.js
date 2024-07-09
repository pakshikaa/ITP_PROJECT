const mongoose = require('mongoose');
const photographerModel = require('../Feedback/photographer');

const { Schema } = mongoose;


const bookingSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Mobile_No: {
        type: String, // Store phone numbers as strings
        required: true
    },
    dateValidity: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Package_Name: {
        type: String,
        required: true
    },
    phoname:{
        type:String,
        ref:photographerModel
    } 
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
