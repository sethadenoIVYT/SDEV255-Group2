addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", addCourse)
})

async function addCourse() {
    const course = {
        number: document.querySelector("#number").value,
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        hours: document.querySelector("#hours").value,
    }

    const response = await fetch("https://burnt-peach-marjoram.glitch.me/api/courses", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(course)
    })

    if(response.ok) {
        const results = await response.json()
        alert("Added course with ID of" + results._id)

        document.querySelector("form").reset()
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot add course"
    }

}
