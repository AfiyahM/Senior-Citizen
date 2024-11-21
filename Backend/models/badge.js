//Backend\models\Badge.js

const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: String,
  description: String,
  criteria: String, // Criteria to earn the badge (optional)
});

module.exports = mongoose.model('badge', badgeSchema);
