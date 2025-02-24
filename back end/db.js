const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://SDEV255:Password255@coursedb.tntth.mongodb.net/?retryWrites=true&w=majority&appName=CourseDB", {useNewUrlParser: true})

module.exports = mongoose