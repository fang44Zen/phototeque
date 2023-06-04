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
    const folderPath = path.join(__dirname, "../../public/uploads", idAlbum);
    fs.mkdirSync(folderPath, { recursive: true });

    const localPath = path.join(folderPath, imageName);
    await req.files.file.mv(localPath);

    album.images.push(imageName);
    await album.save();
    res.json({ reloadPage: true });
  } catch (e) {
    console.log(e);
  }
});

postImage.get("/:id/delete/:imgIndex", async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);
  const imgIndex = req.params.imgIndex;
  const image = album.images[imgIndex];

  const folderPath = path.join(
    __dirname,
    "../../public/uploads",
    idAlbum,
    image
  );
  if (!image) {
    return;
  }
  album.images.splice(imgIndex, 1);
  await album.save();
  fs.unlinkSync(folderPath);
  res.json({ reloadPage: true });
});

module.exports = postImage;
