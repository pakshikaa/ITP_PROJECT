const express = require('express');
const router = express.Router();
const contactController = require('../Controller/Schedule/package_bookController.js');

router.post("/addDetails", contactController.addContactDetails);
router.get("/getcontactdetails", contactController.getContactDetails);
router.get("/getcontact/:id", contactController.getContactById);
router.get('/checkAvailability/:date', contactController.getExistingDates);
router.post('/assign', contactController.assignPhotographer);

router.delete("/deletecontact/:id", contactController.deleteContact);
router.put('/update/:id', contactController.updateBooking);
router.get("/getdetails/:email",contactController.getDetails)

module.exports = router;
