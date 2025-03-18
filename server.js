const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const basicAuth = require("express-basic-auth");
require("dotenv").config();

const app = express();
const port = 3000;

// Set up basic authentication using environment variables
const users = {};
users[process.env.BASIC_AUTH_USER] = process.env.BASIC_AUTH_PASS;

app.use(basicAuth({
  users: users,
  challenge: true
}));

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Upload endpoint
app.post("/speed/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const filePath = path.join(__dirname, "uploads", file.filename);

  // Delete the file after receiving it
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send({ message: "Failed to delete file" });
    }
    res.status(200).send({ message: "File uploaded and deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://0.0.0.0:${port}`);
});
