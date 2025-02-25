const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
var cors = require('cors');

// Import Models
const Course = require('./models/course');
const Teacher = require('./models/teacher');
const Student = require('./models/student');

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS and BodyParser middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/coursesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to check teacher authentication
function isTeacher(req, res, next) {
  if (req.session.teacher) {
    return next();
  }
  res.redirect('/login');
}

// Middleware to check student authentication
function isStudent(req, res, next) {
  if (req.session.student) {
    return next();
  }
  res.redirect('/student-login');
}

// API Routes for courses (RESTful routes)
const router = express.Router();

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
    console.log(courses);
  } catch (err) {
    console.log(err);
  }
});

router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
    console.log(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/courses/:id", async (req, res) => {
  try {
    const course = req.body;
    await Course.updateOne({ _id: req.params.id }, course);
    console.log(course);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Routes for Teacher authentication and course management
app.get('/', async (req, res) => {
  const courses = await Course.find().populate('students');
  res.render('index', { courses, teacher: req.session.teacher, student: req.session.student });
});

// Teacher login
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
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
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Student signup & login
app.get('/student-login', (req, res) => {
  res.render('student-login');
});

app.post('/student-login', async (req, res) => {
  const { username, password } = req.body;
  let student = await Student.findOne({ username, password });
  if (!student) {
    student = await Student.create({ username, password, enrolledCourses: [] });
  }
  req.session.student = student.username;
  res.redirect('/');

app.use("/api", router)
app.listen(3000)
});
