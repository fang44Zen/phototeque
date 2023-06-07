const express = require("express");
const router = express.Router();
const Album = require("../models/Album");
const fs = require("fs-extra");
const path = require("path");

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Album.findByIdAndDelete(id);
  const albumPath = path.join(__dirname, "../../public/uploads", id);
  fs.remove(albumPath, (error) => {
    if (error) {
      console.error(
        "Une erreur s'est produite lors de la suppression du dossier :",
        error
      );
    } else {
      console.log("Le dossier a été supprimé avec succès.");
    }
  });
});

router.get("/:id", async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);
    res.json(album);
  } catch (e) {
    console.log(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des albums.",
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title } = req.body;
    await Album.create({
      title: title,
    });
    res.redirect("http://localhost:3000");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
