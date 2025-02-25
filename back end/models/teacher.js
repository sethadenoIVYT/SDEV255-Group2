const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  username: String,
  password: String,  // In production, hash passwords!
});

module.exports = mongoose.model('Teacher', teacherSchema);
