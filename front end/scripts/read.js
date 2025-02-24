addEventListener("DOMContentLoaded", async function() {
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get('id')
    console.log(courseID)

    const response = await fetch("http://localhost:3000/api/courses/" + courseID)
    const course = await response.json()
    console.log(course)

    let html = ""
    html+='<div class="col-sm-8"><div class="container-lg"><div class="row justify-content-left align-items-center"><div class="col-md-8 text-center text-md-start"><h1><div class="display-3">' + course.number + '</div><div class="display-7 text-muted">' + course.title + '</div></h1><p class="lead my-4 text-muted">' + course.description + '</p><p class="lead my-4 ">TOTAL CREDIT HOURS: ' + course.hours + '</p></div></div></div></div>'
    document.querySelector("#displayCourse").innerHTML = html
})