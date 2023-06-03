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

    console.log(req.files.file.name);
    res.redirect(`http://localhost:3000/albums/${idAlbum}`);
  } catch (e) {
    console.log(e);
  }
});

module.exports = postImage;
