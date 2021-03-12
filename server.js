const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./passportConfig")(passport)
const cookieParser = require("cookie-parser")
const session = require("express-session");
const routes = require("./routes");
require("dotenv").config();
var MySQLStore = require('express-mysql-session')(session);
const app = express();


let options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

let sessionStore = new MySQLStore(options)

let origin;
if(process.env.NODE_ENV === "production") {
  console.log("PRODUCTION")
  origin = "https://mtb-forum.herokuapp.com"
} else {
  console.log("DEVELOPMENT")
  origin = "http://localhost:3000"
}

app.use(
  cors({
  origin,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: `${process.env.cookieSecret}`, // call whatever, use in the cookie parser
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);



app.use(cookieParser(process.env.cookieSecret));
app.use(passport.initialize())
app.use(passport.session());
app.use("/api", routes);




if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening at: ${port}`);
});
