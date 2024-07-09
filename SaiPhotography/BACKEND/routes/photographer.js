const express = require('express');
const photoController = require("../Controller/Feedback/photographerController.js");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set destination for uploaded images

router.route("/sup")
    .get(photoController.getAllPhotographers)
    .post( photoController.createPhotographers);

router.get("/sup/single/:id", photoController.getSinglePhotographers);

router.route("/sup/:id")
    .put(photoController.updatePhotographers)
    .delete(photoController.deletePhotographers);

router.route("/sup/search")
    .get(photoController.searchPhotographers);

router.post("/sup/:id/review", photoController.createReview);
router.delete("/sup/:id/review/:reviewId", photoController.deleteReview);

router.put('/sup/:id/review/:reviewId', photoController.updateReview);


module.exports = router;
