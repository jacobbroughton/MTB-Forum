const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/login", controller.login)

router.get("/logout", controller.logout)

router.post("/register", controller.register)

router.get("/get-categories/:url", controller.getCategories)

router.get("/get-thread-count/:category", controller.getThreadCount)

router.get("/get-recent-threads/offset=:offset", controller.getRecentThreads)

router.get("/get-threads/:category/:lastId", controller.getThreads)

router.get("/get-single-thread/:threadId", controller.getSingleThread)

router.post("/post-comment", controller.postComment)

router.get("/get-comments/:threadId", controller.getComments)

router.get("/get-replies/:threadId", controller.getReplies)

router.post("/newpost", controller.post)

router.get("/user", (req, res) => {
    res.send(req.user)
})


module.exports = router;