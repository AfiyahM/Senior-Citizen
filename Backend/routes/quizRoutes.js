// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const Badge = require('../models/Badge');

// Endpoint to get quiz by video ID
router.get('/:videoId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ videoId: req.params.videoId });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to submit quiz answers
router.post('/:quizId/submit', async (req, res) => {
  const { quizId } = req.params;
  const { userId, answers } = req.body;
  
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    
    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    
    const user = await User.findById(userId);
    user.quizScores.set(quizId, score);
    
    // Award badge if criteria met
    if (score === quiz.questions.length) {
      const badge = await Badge.findOne({ name: 'Quiz Master' }); // Example badge
      if (badge && !user.badges.includes(badge.name)) {
        user.badges.push(badge.name);
      }
    }
    
    await user.save();
    res.json({ message: 'Quiz submitted', score, badges: user.badges });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
