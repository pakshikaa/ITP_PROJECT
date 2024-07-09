const express = require("express");
const router = express.Router();
const controller = require("../Controller/Payment/Payment");
const multer = require("multer");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

router.get("/get", controller.getAllPayments);
router.get("/get/:email", controller.getUserPayments);
router.get("/getbook", controller.getDetails);
router.post("/create", upload.single("image"), controller.createPayment);
router.put("/update/:id", upload.single("image"), controller.updatePayment);
router.delete("/delete/:id", controller.deletePayment);


module.exports = router;
