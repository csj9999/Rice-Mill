// Model/FeedbackModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  feedbackId: {
    type: String,
    required: true,
    unique: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  feedbackMessage: {
    type: String,
    required: true, // The new required field for feedback messages
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
