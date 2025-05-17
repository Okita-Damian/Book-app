const express = require("express");

const {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");

const router = express.Router();

router.get("/", getAllGenres);

router.get("/:id", getGenreById);

router.post("/", createGenre);

router.put("/:id", updateGenre);

router.delete("/:id", deleteGenre);

module.exports = router;
