const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const packageSchema = new Schema({
    
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

const  Package = mongoose.model("Packages", packageSchema);
module.exports = Package;
