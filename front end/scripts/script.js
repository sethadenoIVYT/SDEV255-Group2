addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("hhttps://burnt-peach-marjoram.glitch.me/api/courses")
    const courses = await response.json()

    let html = ""
    for (let course of courses) {
        html+='<li><div class="col-sm-8"><div class="container-lg"><div class="row justify-content-left align-items-center"><div class="col-md-8 text-center text-md-start"><h1><div class="display-3">' + course.number + '</div><div class="display-7 text-muted">' + course.title + '</div></h1><a href="/read.html?id=' + course._id + '">Details</a><div><a href="/edit.html?id=' + course._id + '">Edit</a></div></p></div></div></div></div></li>'
    }

    document.querySelector("#courseList").innerHTML = html
})
