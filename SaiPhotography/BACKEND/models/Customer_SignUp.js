const mongoose = require('mongoose');

const customerSignUpSchema = new mongoose.Schema({
  Email: { type: String, required: true },
  UserName: { type: String, required: true },
  Password: { type: String, required: true },
 
});

const CustomerSignUpDetail = mongoose.model('Customer_SignUp_Detail', customerSignUpSchema);

module.exports = CustomerSignUpDetail;
