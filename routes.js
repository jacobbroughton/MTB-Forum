const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")

let users = []

router.post("/register", async (req, res) => {
    console.log("===== NEW USER =====")
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        // redirect user to login after they register
        console.log(users)
    } catch {

    }
})

module.exports = router;