let express = require("express");
let path = require("path")
let app = express();
let port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello from server")
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

app.listen(port, () => {
    console.log(`Server listening at: ${port}`)
})

