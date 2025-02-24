const db = require("../db")

const Course = db.model("Course", {
    number:{type:String, required:true},
    title: String,
    description: String,
    hours:{type:Number, min:1, max:5}
})

module.exports = Course