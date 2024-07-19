// Controllers/FeedbackController.js
const Feedback = require("../Model/FeedbackModel");

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    return res.status(200).json(feedbacks);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving feedbacks.", error: err });
  }
};

const addFeedback = async (req, res) => {
  const { feedbackId, customerId, productName, feedbackMessage } = req.body;

  try {
    const newFeedback = new Feedback({
      feedbackId,
      customerId,
      productName,
      
      feedbackMessage, // Ensure the field is added here
    });

    await newFeedback.save(); // Attempt to save to MongoDB
    return res.status(201).json(newFeedback); // Return the new feedback
  } catch (error) {
    return res.status(500).json({ message: 'Error creating feedback.', error: error.message }); // Error message for feedback
  }
};

const getFeedbackById = async (req, res) => {
  const feedbackId = req.params.id;

  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }
    return res.status(200).json(feedback);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving feedback.", error: err });
  }
};

const updateFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  const { productName, feedbackMessage } = req.body; // Add feedbackMessage

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      {
        productName,
        feedbackMessage, // Include feedbackMessage in the update
      },
      { new: true } // Return the updated document
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    return res.status(200).json(feedback);
  } catch (err) {
    return res.status(500).json({ message: "Error updating feedback.", error: err });
  }
};

const deleteFeedback = async (req, res) => {
  const feedbackId = req.params.id;

  try {
    const feedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    return res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting feedback.", error: err });
  }
};

module.exports = {
  getAllFeedbacks,
  addFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
