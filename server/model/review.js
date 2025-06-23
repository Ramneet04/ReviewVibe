const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: false, // Optional for flexibility
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  sentiment: {
    type: String,
    enum: ['Positive', 'Negative', 'Neutral'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);