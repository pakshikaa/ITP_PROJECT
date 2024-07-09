const express = require('express');
const InvController = require("../Controller/Inventory/Inventory");
const router = express.Router();


//All routers are here
router.post("/add", InvController.createProduct);
router.get("/products", InvController.getProducts);
router.delete("/delete/:id", InvController.deleteProduct);
router.get("/update/:id", InvController.getProductForUpdate);
router.put("/update/:id", InvController.updateProduct);
module.exports =router;