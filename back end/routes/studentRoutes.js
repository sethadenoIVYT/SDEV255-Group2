const express = require('express');
const Student = require('../models/student');
const Course = require('../models/course');

const router = express.Router();

// Student signup & login
router.get('/student-login', (req, res) => {
  res.render('student-login');
});

router.post('/student-login', async (req, res) => {
  const { username, password } = req.body;
  let student = await Student.findOne({ username, password });
  if (!student) {
    student = await Student.create({ username, password, enrolledCourses: [] });
  }
  req.session.student = student.username;
  res.redirect('/');
});

module.exports = router;
