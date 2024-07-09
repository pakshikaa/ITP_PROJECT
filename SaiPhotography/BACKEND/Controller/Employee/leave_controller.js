const Leave = require('../../models/empmodel/Leave_model');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

// Function to send email notification
const sendEmailNotification = async (toEmail, leaveType) => {

  // Create a Nodemailer transporter using SMTP or other email service of your choice
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'balacinema235@gmail.com',
      pass: 'bzfv mdhl rgic rlhu' // Your Gmail password or app-specific password
    }
  });

  // Email content
  const mailOptions = {
    from: 'balacinema235@gmail.com',
    to: toEmail, // Recipient email address
    subject: 'Leave Application Notification',
    text: `Your ${leaveType} leave application has been submitted successfully. status is`
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};

// Get all leaves for the authenticated employee
exports.getAllLeaveForEmployee = async (req, res) => {
  try {
    const email = req.user.email;
    const leaves = await Leave.find({ email: email });
    res.json(leaves);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error while retrieving leave information' });
  }
};

// Create a new leave request for the authenticated employee
exports.createLeave = async (req, res) => {
  const { leaveType, startDate, endDate, PhotoFileName } = req.body;
  const email = req.user.email; // Retrieve email from JWT token or local storage

  if (!leaveType || !startDate || !endDate) {
    return res.status(400).json({ message: 'Leave type, start date, and end date are required' });
  }

  try {
    const leaveId = uuidv4().slice(0, 4); // Generate a UUID for LeaveId
    const leave = new Leave({
      LeaveId: leaveId,
      email: email,
      leaveType,
      startDate,
      endDate,
      status: 'pending',
      adminComment: 'pending',
      PhotoFileName
    });

    const savedLeave = await leave.save();
    
    // Send email notification
    await sendEmailNotification(email, leaveType);
    
    res.status(201).json(savedLeave);
  } catch (err) {
    res.status(500).json({ message: 'Error adding leave to database' });
  }
};

// Update a leave request
exports.updateLeave = async (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: err.message || `Error while updating the data cannot be empty` });
  }
  try {
    const id = req.params.id;
    const data = await Leave.findByIdAndUpdate(id, req.body);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({ message: err.message || `cannot update LEAVE with identified id ${id} or maybe user not found!` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || `error updating LEAVE information` });
  }
};

// Delete a leave request
exports.deleteLeave = async (req, res) => {
  const id = req.params.id; // Extract the leave ID from the request parameters
  try {
    // Attempt to find and delete the leave with the specified ID and associated with the authenticated user's email
    const deletedLeave = await Leave.findByIdAndDelete(id);
    if (!deletedLeave) {
      // If the leave was not found or the user doesn't have permission to delete it, respond with a 404 status
      return res.status(404).json({ message: `Leave not found or you don't have permission to delete` });
    }
    // If the leave was successfully deleted, respond with a success message
    res.json({ message: 'Leave deleted successfully' });
  } catch (err) {
    // If an error occurs during the deletion process, respond with a 500 status and an error message
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: `Error deleting leave with id ${id}` });
  }
};
