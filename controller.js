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
    connection.query(`INSERT INTO posts (user_id, main_text, tldr, bike_year, bike_brand, bike_model, bike_spec, date_created, time_created) VALUES ('${req.body.userId}', '${req.body.mainText}', '${req.body.tldr}', '${req.body.bikeYear}', '${req.body.bikeBrand}', '${req.body.bikeModel}', '${req.body.bikeSpec}', '${req.body.dateCreated}', '${req.body.timeCreated}')`, (err, rows, fields) => {
        if (err) throw err;
    })
}

exports.getPosts = (req, res) => {
    connection.query(`SELECT * FROM posts`, (err, rows, fields) => {
        res.send(rows)
    })
}