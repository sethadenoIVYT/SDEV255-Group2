const express = require("express")
var cors = require('cors')

const bodyParser = require('body-parser')
const Course = require("./models/courses")
const app = express()
app.use(cors())

app.use(bodyParser.json())
const router = express.Router()

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

app.use("/api", router)
app.listen(3000)
