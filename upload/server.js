const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const response = require("./response");
const path = require("path");
const PORT = 4001;

// Listen:
app.listen(PORT, () => {
  console.log("\x1b[32m", "\n-> Start uploading...\n");
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
  res.render("main", {
    page: "index",
  });
});

app.get("/music", (req, res) => {
  res.render("main", {
    page: "music",
  });
});

app.get("/album", (req, res) => {
  res.render("main", {
    page: "album",
  });
});

app.get("/team", (req, res) => {
  res.render("main", {
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
