const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const response = require("./response");
const path = require("path");
const PORT = 4001;

// Listen:
app.listen(PORT, () => {
  console.log("Start uploading...");
});

// Run:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./pages"));
app.use(express.static(path.join(__dirname, "/styles")));

app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  })
);

// Routes:
app.get("/", (req, res) => {
  res.render("index", {
    page: "index",
  });
});

app.get("/music", (req, res) => {
  res.render("index", {
    page: "music",
  });
});

app.get("/album", (req, res) => {
  res.render("index", {
    page: "album",
  });
});

app.get("/team", (req, res) => {
  res.render("index", {
    page: "team",
  });
});

app.all("*", (req, res) => {
  response({
    req,
    message: "error 404",
    error: true,
  })(res);
});
