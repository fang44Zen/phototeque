const express = require("express");
const router = express.Router();
const Album = require("../models/Album");
const path = require("path");

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Album.findByIdAndDelete(id);
    res.json({ message: "Album supprimé avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression de l'album",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);
    res.json(album);
    console.log(idAlbum);
  } catch (e) {
    console.log(e);
  }
});

// router.post("/:id", async (req, res) => {
//   try {
//     const idAlbum = req.params.id;
//     const album = await Album.findById(idAlbum);
//     const localPath = path.join(
//       __dirname,
//       "../../server/uploads",
//       idAlbum,
//       req.files.file.name
//     );
//     await req.files.file.mv(localPath);

//     console.log(req.files.file.name);
//     res.redirect(`http://localhost:3000/albums/${idAlbum}`);
//   } catch (e) {
//     console.log(e);
//   }
// });

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
