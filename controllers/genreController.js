const Genre = require("../models/genre");
const Book = require("../models/author");
const mongoose = require("mongoose");

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres", error });
  }
};

const getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid genre ID" });
    }

    const genre = await Genre.findById(id).populate({
      path: "books",
      select: "name",
    });
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json(genre);
  } catch (error) {
    console.log("error in getGenreId", error);
    res.status(500).json({ message: "Error fetching genre", error });
  }
};

const createGenre = async (req, res) => {
  try {
    const { name, description, books } = req.body;

    const genre = new Genre({ name, description, books: books || [] });
    const saved = await genre.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating genre", error });
  }
};

const updateGenre = async (req, res) => {
  try {
    const { name, description, books } = req.body;

    const updated = await Genre.findByIdAndUpdate(
      req.params.id,
      { name, description, books },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating genre", error });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const deleted = await Genre.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting genre", error });
  }
};

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
