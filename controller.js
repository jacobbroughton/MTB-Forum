const mysql = require("mysql");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
require("./passportConfig")(passport);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

connection.connect()

// module.exports = connection;

exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log("Authenticating")
        if (err) throw err;
        if (!user) console.log("No User Exists")
        else {
            req.logIn(user, (err) => {
                if(err) throw err;
                res.send("Successfully Authenticated");
            })
        }
    })(req, res, next)
}

exports.logout = (req, res, next) => {
    console.log("logging out " + req.user.username)
    req.logout()
    req.session.destroy((err) => {
        if(err) return (next(err));
        return res.send({ authenticated: req.isAuthenticated() })
    })
}

exports.register = (req, res) => {
    connection.query(`SELECT * FROM users WHERE username = '${req.body.username}' LIMIT 1 `, 
    async (err, rows, fields) => {
        if (err) throw err;
        if (rows[0]) { console.log("USER EXISTS") }
        if (!rows[0]) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            connection.query(`INSERT INTO users (username, password, first_name, last_name, profile_picture, date_created, time_created) VALUES ('${req.body.username}', '${hashedPassword}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.profilePicture}', '${req.body.date}', '${req.body.time}')`)
            console.log("User Added")
        }
    })
}

exports.post = (req, res) => {
    connection.query(`INSERT INTO threads (user_id, title, main_text, category, date_created, time_created) VALUES ('${req.body.userId}', '${req.body.title}', '${req.body.mainText}', '${req.body.category}', '${req.body.dateCreated}', '${req.body.timeCreated}')`, (err, rows, fields) => {
        if (err) throw err;
    })
}

exports.getThreads = (req, res) => {
    connection.query(`SELECT * FROM threads WHERE category = '${req.params.category}'`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows)
    })
}

exports.getSingleThread = (req, res) => {
    connection.query(`SELECT * FROM threads WHERE id = ${req.params.threadId}`, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows[0])
    })
}

exports.postComment = (req, res) => {
    connection.query(`INSERT INTO comments (thread_id, user_id, replied_comment_id, username, main_text, date_created, time_created) VALUES (${req.body.threadId}, ${req.body.userId}, ${req.body.repliedCommentId}, '${req.body.username}', '${req.body.mainText}', '${req.body.dateCreated}', '${req.body.timeCreated}')`, (err, rows, fields) => {
        if (err) throw err;
    })
}

exports.getComments = (req, res) => {
    connection.query(`SELECT * FROM comments WHERE thread_id = '${req.params.threadId}' AND replied_comment_id IS NULL`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows)
    })
}

exports.getReplies = (req, res) => {
    connection.query(`SELECT * FROM comments WHERE thread_id = '${req.params.threadId}' AND replied_comment_id IS NOT NULL`, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows)
    })
}