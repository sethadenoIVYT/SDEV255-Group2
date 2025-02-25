addEventListener("DOMContentLoaded", async function(){
    document.querySelector("#updateBtn").addEventListener("click",updateCourse)
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get('id')
    const response = await fetch("https://burnt-peach-marjoram.glitch.me/api/courses/" + courseID)
    if(response.ok){
        let course = await response.json()
        document.querySelector("#number").value = course.number
        document.querySelector("#title").value = course.title
        document.querySelector("#description").value = course.description
        document.querySelector("#hours").value = course.hours 
    }
})
async function updateCourse() {
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get('id')
    const course = {
        number: document.querySelector("#number").value,
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        hours: document.querySelector("#hours").value,
    }
         
    const response = await fetch("https://burnt-peach-marjoram.glitch.me/api/courses/" + courseID, {
       method: "PUT",
       headers: {
          "Content-Type": "application/json"
       },
       body: JSON.stringify(course)
    });
 
    if (response.ok) {      
       alert("Updated course.");
    }
    else {
       document.querySelector("#error").innerHTML = "Cannot update course.";
    }     
 }
