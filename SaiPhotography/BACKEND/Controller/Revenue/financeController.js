const Finance = require("../../models/Revenue/financeModel");

exports.createFinanceEntry = async (req, res) => {
  try {
    const createdFinance = await Finance.create({
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
      date: req.body.date,
      description: req.body.description,
      reference: req.body.reference,
    });

    console.log(createdFinance);
    res.status(201).send("Transaction Created Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating finance entry" });
  }
};

exports.getAllFinanceEntries = async (req, res) => {
  try {
    const financeEntries = await Finance.find();
    res.status(200).json(financeEntries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching finance entries" });
  }
};

exports.deleteFinanceEntry = async (req, res) => {
  try {
    const deletedFinance = await Finance.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log(deletedFinance);
    res.status(200).json({
      message: "Finance entry deleted successfully",
      deletedFinance: deletedFinance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting finance entry" });
  }
};

exports.getFinanceEntryById = async (req, res) => {
  try {
    const financialRecord = await Finance.findById(req.params.id);
    if (!financialRecord) {
      return res.status(404).json({ error: "Financial record not found" });
    }
    res.status(200).json(financialRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateFinanceEntry = async (req, res) => {
  try {
    const updatedFinance = await Finance.findByIdAndUpdate(
      { _id: req.params.id },
      {
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        description: req.body.description,
        reference: req.body.reference,
      },
      { new: true } // To return the updated document
    );

    console.log(updatedFinance);
    res.status(200).json({
      message: "Finance entry updated successfully",
      updatedFinance: updatedFinance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating finance entry" });
  }
};
