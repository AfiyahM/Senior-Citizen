//Backend\models\Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number, // Index of the correct option
    },
  ],
});

module.exports = mongoose.model('quiz', quizSchema);
