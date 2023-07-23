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
app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  })
);
app.use(
  express.static(__dirname, {
    extensions: ["html"],
  })
);

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname),
  });
  res.end();
});

app.all("*", (req, res) => {
  response({
    req,
    message: "error 404",
    error: true,
  })(res);
});
