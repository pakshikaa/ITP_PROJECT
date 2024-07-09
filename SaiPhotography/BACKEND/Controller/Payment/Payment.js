
const paymentModel = require("../../models/Payment/Payment");
const Booking = require("../../models/Schedule/Booking.js");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await paymentModel.find();
    res.json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getUserPayments = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const payments = await paymentModel.find({ Email: userEmail });
    res.json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createPayment = async (req, res) => {
  const { cash, bank, date, Email, bookingId } = req.body;
  const image = req.file ? req.file.filename : "";

  try {
    // Create a new payment entry with payment details and associated booking ID
    const newPayment = new paymentModel({
      cash,
      bank,
      date,
      image,
      Email,
      bookingId // Assign the booking ID to the payment model
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePayment = async (req, res) => {
  const { cash, bank, date } = req.body;
  const image = req.file ? req.file.filename : "";
  const id = req.params.id;

  try {
    const update = await paymentModel.findByIdAndUpdate(
      id,
      { cash, bank, date, image },
      { new: true }
    );

    if (!update) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(update);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPayment = await paymentModel.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

///////////////////////////////////////////////////////////////////////
exports.getDetails = (req, res) => {
 
  const userEmail = req.params.email; 
  // Find bookings associated with the logged-in user's email
  Booking.find({ Email: userEmail }) 
    .then((bookings) => {
      res.json(bookings);
    })
    .catch((err) => {
      console.error("Error fetching bookings:", err);
      res.status(500).json({ error: "An error occurred while fetching bookings." });
    });
};
