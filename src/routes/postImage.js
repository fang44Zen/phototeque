const express = require("express");
const postImage = express.Router();
const Album = require("../models/Album");
const path = require("path");

postImage.post("/:id", async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);
    const localPath = path.join(
      __dirname,
      "../../server/uploads",
      req.files.file.name
    );
    await req.files.file.mv(localPath);
    res.json({ reloadPage: true });
    // res.redirect("http://localhost:3000");
  } catch (e) {
    console.log(e);
  }
});

module.exports = postImage;
