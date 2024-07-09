const router = require("express").Router();
let Customerdetail = require("../models/Contact_Us");

router.route("/addDetails").post((req,res) =>{
    const Name = req.body.Name;
    const Email =  req.body.Email;
    const Mobile_No = Number(req.body.Mobile_No);
    const Subject = req.body.Subject;
    const Message = req.body.Message;

    const newcontacts = new Customerdetail({
        Name,
        Email,
        Mobile_No,
        Subject,
        Message
    })

    newcontacts.save().then(() =>{
        res.json("Details are Added") 
    }).catch((err) =>{
        console.log(err);
    })

}) 

router.route("/getcontactdetails").get((req,res) =>{
    Customerdetail.find().then((customermessages) => {
        res.json(customermessages);
    }).catch((err) =>{
        console.log(err);
        res.status(500).json({ error: "An error occurred while fetching customer data." });
    })
})


    
router.route("/deletecontact/:id").delete(async(req,res) =>{
    let contactID = req.params.id;

    await Customerdetail.findByIdAndDelete(contactID)
    .then(() =>{
        res.status(200).send({status:"customer contact deleted"});

    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete data", error: err.message});
    })
})

router.route("/getcontact/:id").get(async(req,res) =>{
    let ContactId = req.params.id;
    await Customerdetail.findById(ContactId)
    .then((contacts)=>{
        res.status(200).send({status:"contact Fetched",contacts});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get contact", error: err.message});
    })
})

module.exports = router;