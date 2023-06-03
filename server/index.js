const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const albumRoutes = require("../src/routes/album.route");
const postImage = require("../src/routes/postImage");

app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/albums", albumRoutes);
app.use("/api/albums/upload", postImage);

mongoose.connect("mongodb://127.0.0.1:27017/phototheque");

app.listen(5000, () => {
  console.log("L'application est bien lancée.");
});
