const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const response = require("./response");
const path = require("path");
const PORT = 4001;
const config = require("../src/assets/config/config.json");

// Listen:
app.listen(PORT, () => {
  console.log("\x1b[32m", "\n-> Start uploading...\n","\x1b[0m");
});

// Run:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./pages"));
app.use(express.static(path.join(__dirname, "/styles")));
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  "/fonts",
  express.static(path.join(__dirname, "../node_modules/vazirmatn/fonts"))
);

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
    config: config,
  });
});

app.get("/music", (req, res) => {
  res.render("main", {
    page: "music",
    config: config,
  });
});

app.get("/album", (req, res) => {
  res.render("main", {
    page: "album",
    config: config,
  });
});

app.get("/team", (req, res) => {
  res.render("main", {
    page: "team",
    config: config,
  });
});

app.all("*", (req, res) => {
  response({
    req,
    message: "error 404",
    error: true,
  })(res);
});
