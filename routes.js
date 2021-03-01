const express = require("express");
let app = express();
const router = express.Router();
const controller = require("./controller");

router.post("/login", controller.login)

router.get("/logout", controller.logout)

router.post("/register", controller.register)

router.get("/gettasks/:userId", controller.getTasks);

router.post("/posttask", controller.postTask)

router.get("/user", (req, res) => {
    res.send(req.user)
})


module.exports = app;