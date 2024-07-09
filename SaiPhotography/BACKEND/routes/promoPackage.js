const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../Controller/Package/Promo_package");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/add", upload.array("images"), controller.addAlbum);
router.get("/getdetail", controller.getAlbumDetails);
router.put("/update/:id", controller.updateAlbum);
router.delete("/delete/:id", controller.deleteAlbum);
router.get("/get/:id", controller.getAlbumById);

module.exports = router;
