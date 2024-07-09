const express = require("express");
const router = express.Router();
const financeController = require("../Controller/Revenue/financeController");

// Create API route for Create method in CRUD Operations
router.post("/add", financeController.createFinanceEntry);

// Create API route for Read method in CRUD Operations
router.get("/trans", financeController.getAllFinanceEntries);

// Create API route for Delete method in CRUD Operations
router.delete("/delete/:id", financeController.deleteFinanceEntry);

// Create API route for Read single entry method in CRUD Operations
router.get("/update/:id", financeController.getFinanceEntryById);

// Create API route for Update method in CRUD Operations
router.put("/update/:id", financeController.updateFinanceEntry);

module.exports = router;
