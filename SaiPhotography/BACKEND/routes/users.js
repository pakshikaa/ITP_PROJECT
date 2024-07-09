const router = require("express").Router();
let Customer = require("../models/Customer_SignUp")
const Auth = require("../middleware/auth")

router.route("/register").post(async (req,res) =>{
    const Email = req.body.Email;
    const UserName =  req.body.UserName;
    const Password = req.body.Password;

    const userNew = new Customer({
        Email,
        UserName,
        Password
    })

    try{
        const SysUser = await Customer.findOne({Email:Email,UserName:UserName,Password:Password})

        if(SysUser){
            res.json("exist")
        }
        else{
            res.json("notexist")
            userNew.save()
        }
    }

    catch(e){
        res.json("error")
    }

}) 

router.route("/update/:UserName").put(async(req,res) =>{
    let username = req.params.UserName;
    const {Email,UserName,Password} = req.body;

    const updateUser = ({
        Email,
        UserName,
        Password
    })
     
    const update = await Customer.findOneAndUpdate({UserName:username},updateUser)
    .then(()=>{
        res.status(200).send({status:" Updated Details"}) //responce updated in frontend
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        })
})

router.route("/get/login",Auth).post(async (req, res) => {
    const { Email, Password } = req.body;
    

    try {
        const SysUser = await Customer.findOne({ Email, Password });

        if (SysUser) {
            return res.json({ username: SysUser.UserName ,id:SysUser._id,Email:SysUser.Email}); // Send username in response
        } else {
            return res.status(401).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});



router.route("/accountdetails").get((req, res) => {
    Customer.find()
        .then((customers) => {
            res.json(customers);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "An error occurred while fetching customer data." });
        });
});


router.route("/delete/:id").delete(async(req,res) =>{
    let UserNameId = req.params.id;

    await Customer.findByIdAndDelete(UserNameId)
    .then(() =>{
        res.status(200).send({status:"User deleted"});

    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete data", error: err.message});
    })
})

router.route("/getsignupdetail/:id").get(async(req,res) =>{
    let usernameId = req.params.id;
    await Customer.findById(usernameId)
    .then((user)=>{
        res.status(200).send({status:"User fetched",user});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get User", error: err.message});
    })
})

router.route("/getbyUserName/:Email").get(async(req,res)=>{
    let getEmail =req.params.Email;
    const user = await Cus_signUp.find({Email:getEmail}).then((user)=>{
        res.status(200).send({status:"user fetched", user});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with get user", error:err.message});
    })
})

module.exports = router;