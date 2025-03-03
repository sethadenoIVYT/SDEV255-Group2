function checkAuth(){
    if(localStorage.getItem("uname") === "IvyStudent"){
        window.location.replace("/index.html")
    }
}

checkAuth()