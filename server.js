const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser")
const session = require("express-session");
const routes = require("./routes");
require("dotenv").config();
const app = express();




app.use(
  cors({
  // origin: "http://localhost:3000", // Location of the react app we're connected to
  origin: "https://task-board-jb.herokuapp.com",
  credentials: true
  // allowedHeaders: 'Content-Type,application/text-plain'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secretcode", // call whatever, use in the cookie parser
    resave: true,
    saveUninitialized: true,
    // store: someStore
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);



app.use(cookieParser("secretcode"));
app.use(passport.initialize())
app.use(passport.session());
require("./passportConfig")(passport)

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
