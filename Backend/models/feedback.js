//Backend\models\Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Video', 
        required: true 
    },
    rating: { type: Number, required: true },
    comment: { type: String }
});

module.exports = mongoose.model('feedback', feedbackSchema);
