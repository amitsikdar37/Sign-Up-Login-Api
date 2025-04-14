// models/Voter.js
const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

module.exports = mongoose.model('Voter', voterSchema);
