const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');
let fileUpload = require('express-fileupload')
const path = require('path');


require("dotenv").config();

const PORT = process.env.PORT || 8070;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
//app.use(fileUpload());
app.use(morgan('tiny'));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("Mongodb connection success!!");
})

//if we call backend in frontend using http://localhost:8070/packagesweb(backend URL) -> load the js file which assign the packagesRouter
//Package
const packagesRouter = require("./routes/packages.js");
app.use("/packagesweb", packagesRouter);

const PromopackagesRouter = require("./routes/promoPackage.js");
app.use("/promopackagesweb", PromopackagesRouter);

//contact
const CustomerContactRouter = require("./routes/Customer_Contacts.js");
app.use("/customercontact",CustomerContactRouter);

//booking package
const BookRouter = require("./routes/Package_book.js");
app.use("/Bookingdetail",BookRouter);

//Signup
const SignupRouter = require("./routes/users.js");
app.use("/webuser",SignupRouter);

app.use('/uploads', express.static('uploads'));

//supplier
const supRoutes = require("./routes/sup.js");
app.use("/api/v1", supRoutes);

//Feedback
const serviceFeedbackRouter = require("./routes/serviceFeedback.js"); 
app.use('/api/CustomerAffairs',serviceFeedbackRouter);

//Photographerrating
const phoRoutes =require ("./routes/photographer.js");
app.use("/api/pho", phoRoutes);

//Inventory
const InvRoutes =require ("./routes/Inventory.js");
app.use("/api/Product", InvRoutes);

//Revenue
const transactions = require('./routes/financeRoutes.js');
app.use('/transactions', transactions);

//Paymenr
const payment = require('./routes/payment.js');
app.use('/payment', payment);
///employee
app.get('/', (req, res) => {
    res.send("Welcome to Employe management! ");
  })
  //API
  app.use('/',require('./routes/router'))



app.listen(PORT, () => {
    console.log(`Server is up and runnig on port number : ${PORT}`)
})
