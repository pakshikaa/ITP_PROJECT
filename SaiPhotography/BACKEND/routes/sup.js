const express = require('express');
let supController =require( "../Controller/Supplier/sup.js");
const router = express.Router();


//All routers are here
router.get("/sup", supController.getAllSup);
router.post("/sup", supController.createSup);
router.get("/sup/single/:id", supController.getSingleSup);
router.put("/sup/:id", supController.updateSup);
router.delete("/sup/:id", supController.deleteSup);
router.get("/sup/search?",supController.getsearchsupplier);
module.exports = router;