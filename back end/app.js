const express = require("express")
var cors = require('cors')

const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require('./models/users')
const Course = require("./models/courses")
const app = express()
app.use(cors())

app.use(bodyParser.json())
const router = express.Router()
const secret = "supersecret"

router.post("/user", async(req,res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"})
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status,
        teacher: req.body.teacher
    })

    try {
        await newUser.save()
        res.sendStatus(201)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

router.post("/auth", async(req,res) =>{
    if(!req.body.username || !req.body.password){
       res.status(401).json({error: "Missing username or password"})
       return
    }
    try{
       const user = await User.findOne({username: req.body.username})
       if (!user){
          res.status(401).json({error: "Bad Username"})
      
       }
       else{
          if(user.password === req.body.password){
             username2 = user.username
             teacher2 = user.teacher
             const token = jwt.encode({username: user.username}, secret)
             const auth = 1
             res.json({username2, teacher2, token: token, auth: auth})
          }
          else{
             res.status(401).json({error: "Bad Password"})
          }
       }
    }
    catch(err){
       res.status(400).send(err.message)
    }
 
       
})

router.get("/status", async(req,res) => {
    if(!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth"})
    }

    const token = req.headers["x-auth"]
    try {
        const decoded = jwt.decode(token,secret)

        let users = User.find({}, "username status")
        res.json(users)
    }
    catch(ex) {
        res.status(401).json({error: "invalid jwt"})
    }
})

router.get("/courses", async(req,res) => {
    try {
        const courses = await Course.find({})
        res.send(courses)
        console.log(courses)
    }
    catch (err) {
        console.log(err)
    }
})

router.get("/courses/:id", async (req,res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.json(course)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post("/courses", async(req,res) => {
    try {
        const course = await new Course(req.body)
        await course.save()
        res.status(201).json(course)
        console.log(course)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.put("/courses/:id", async(req,res) => {
    try {
        const course = req.body
        await Course.updateOne({_id: req.params.id}, course)
        console.log(course)
        res.sendStatus(204)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.delete("/courses/:id", async(req,res) => {
    try {
        const course = await Course.findById(req.params.id)
        await Course.deleteOne({_id: course._id})
        res.sendStatus(204)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

app.use("/api", router)

app.listen(process.env.PORT || 3000)
