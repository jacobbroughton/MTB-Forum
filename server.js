let express = require("express");
let app = express();
let path = require("path");
let cors = require("cors");
let bodyParser = require("body-parser");

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const posts = [
    {
        username: "Jacob",
        title: "Post 1"
    },
    {
        username: "Mike",
        title: "Post 2"
    },
    {
        username: "Sean",
        title: "Post 3"
    },
]

app.get("/api", (req, res) => {
  res.json(posts);
});

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
