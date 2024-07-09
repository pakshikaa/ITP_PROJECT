const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const promopackageSchema = new Schema({
    
    Package_Name: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    images: [
        {
            filename: String, 
            path: String,     
        }
    ]
})

const promoPackage = mongoose.model("promoPackages", promopackageSchema);
module.exports = promoPackage;
