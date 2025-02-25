const express = require('express');
const Teacher = require('../models/teacher');
const Course = require('../models/course');

const router = express.Router();

// Teacher login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const teacher = await Teacher.findOne({ username, password });
  if (teacher) {
    req.session.teacher = teacher.username;
    res.redirect('/');
  } else {
    res.send('Invalid login credentials');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
