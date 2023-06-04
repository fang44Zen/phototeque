const express = require("express");
const postImage = express.Router();
const Album = require("../models/Album");
const path = require("path");
const fs = require("fs");

postImage.post("/:id", async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);
    const imageName = req.files.file.name;
    const folderPath = path.join(__dirname, "../../server/uploads", idAlbum);
    fs.mkdirSync(folderPath, { recursive: true });

    const localPath = path.join(
      __dirname,
      "../../server/uploads",
      idAlbum,
      imageName
    );
    await req.files.file.mv(localPath);
    res.json({ reloadPage: true });

    album.images.push(imageName);
    await album.save();
  } catch (e) {
    console.log(e);
  }
});

module.exports = postImage;
