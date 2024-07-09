const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    
    text: { type: String, required: false },
    rating: { type: Number, required: false },
    comment: { type: String, required: false },
    userEmail: { type: String, required: false },
  
});


const photographerSchema = mongoose.Schema({
    F_name: {
        type: String,
    },
    L_name: {
        type: String,
    },
    images: [
        {
            filename: String, 
            path: String,     
        }
    ],
    Email: {
        type: String,
    },
    Phone: {
        type: String,
    },
    Address: {
        type: String,
    },
    
    reviews: [reviewSchema], 
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: false,
        default: 0,
    }
});

const photographerModel = mongoose.model("Photographer", photographerSchema);
module.exports = photographerModel;
