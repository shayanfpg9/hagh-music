const app = require("express")();
const fileUpload = require("express-fileupload");
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

// Get request:
app.post("/", (req, res) => {});
