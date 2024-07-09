// serviceFeedbackController.js

const mongoose = require('mongoose');
const ServiceFeedback = require("../../models/Feedback/serviceFeedbackModel.js");

// Get all service feedbacks
exports.getServiceFeedbacks = async (req, res) => {
    try {
        const serviceFeedbacks = await ServiceFeedback.find({}).sort({ createdAt: -1 });
        res.status(200).json(serviceFeedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single service feedback
exports.getServiceFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such service feedback' });
        }
        const serviceFeedback = await ServiceFeedback.findById(id);
        if (!serviceFeedback) {
            return res.status(404).json({ error: 'No such service feedback' });
        }
        res.status(200).json(serviceFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new service feedback
exports.createServiceFeedback = async (req, res) => {
    try {
        const { userId, name, email, rating, feedback } = req.body;
        const newServiceFeedback = await ServiceFeedback.create({ userId, name, email, rating, feedback });
        res.status(200).json(newServiceFeedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a service feedback
exports.deleteServiceFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such service feedback' });
        }
        const deletedServiceFeedback = await ServiceFeedback.findByIdAndDelete(id);
        if (!deletedServiceFeedback) {
            return res.status(404).json({ error: 'No such service feedback' });
        }
        res.status(200).json(deletedServiceFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a service feedback
exports.updateServiceFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such service feedback' });
        }
        const updatedServiceFeedback = await ServiceFeedback.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedServiceFeedback) {
            return res.status(404).json({ error: 'No such service feedback' });
        }
        res.status(200).json(updatedServiceFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
