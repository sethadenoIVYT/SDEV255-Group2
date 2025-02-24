const express = require("express")
var cors = require('cors')

const app = express()
app.use(cors())
const router = express.Router()

router.get("/courses", function(req,res) {
    const courses = [{
        number: "ENGR 261",
        title: "Dynamics",
        description: "Covers rectilinear and curvilinear motions, force, mass and acceleration, projectiles, pendulums, inertia forces in machines, work and energy, impulse and momentum and impact.",
        hours: 3
    },
    {
        number: "AGRI 102",
        title: "Agricultural Business and Farm Management",
        description: "Deals with vast and complex business of agriculture; emphasizes modern business and farm production methods along with current management and administrative strategies needed for success in an agricultural business.",
        hours: 3
    }
];

    res.json(courses)
})

app.use("/api", router)
app.listen(3000)
