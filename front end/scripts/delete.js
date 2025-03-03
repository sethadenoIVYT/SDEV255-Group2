addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#deleteBtn").addEventListener("click", deleteCourse)
    getAllCourses()
})

async function getAllCourses() {
    const response = await fetch("http://localhost:3000/api/courses")
    if (response.ok){
        const courses = await response.json()
        let html = ""
        for (let course of courses){
            html += `<option value="${course._id}">${course.title}</option>`
        }
        document.querySelector("#courseDropDown").innerHTML = html
    }
    
}

async function deleteCourse() {
    const courseID = document.querySelector("#courseDropDown option:checked").value
    const response = await fetch("http://localhost:3000/api/courses/" + courseID, {
        method: "DELETE"
    })
    if(response.ok) {
        
        getAllCourses()
        alert("Course Deleted")
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot delete course"
    }
}