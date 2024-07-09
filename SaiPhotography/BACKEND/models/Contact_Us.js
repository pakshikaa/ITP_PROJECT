const mongoose =  require('mongoose');

const Schema = mongoose.Schema;
const contactScema = new Schema({
    Name :{
        type : String,
        required : true
    },

    Email :{
        type : String,
        required: true
    },

    Mobile_No :{
        type: Number,
        required : true
    },

    Subject :{
        type: String,
        required: true
    },

    Message :{
        type : String,
        required : true
    }

})

const Customermodel = mongoose.model("CustomerContact",contactScema);
module.exports = Customermodel;