// serviceFeedbackRouter.js

const express = require('express');
const feedbackController = require("../Controller/Feedback/serviceFeedbackController.js");
const serviceFeedbackRouter = express.Router();

// GET all service feedbacks
serviceFeedbackRouter.get('/', feedbackController.getServiceFeedbacks);

// GET a single service feedback
serviceFeedbackRouter.get('/:id', feedbackController.getServiceFeedback);

// POST a new service feedback
serviceFeedbackRouter.post('/', feedbackController.createServiceFeedback);

// DELETE a service feedback
serviceFeedbackRouter.delete('/:id', feedbackController.deleteServiceFeedback);

// UPDATE a service feedback
serviceFeedbackRouter.patch('/:id', feedbackController.updateServiceFeedback);

module.exports = serviceFeedbackRouter;
