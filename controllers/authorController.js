const Author = require("../models/author");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors", error });
  }
};

const getAuthorByName = async (req, res) => {
  try {
    const author = await Author.findOne({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (!author) return res.status(404).json({ message: "Author not found" });

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: "Error fetching author", error });
  }
};

const createAuthor = async (req, res) => {
  const { name, birthYear, biography, books = [] } = req.body;

  try {
    // const existingAuthor = await Author.findOne({ name });
    // if (existingAuthor) {
    //   return res.status(409).json({ message: "Author already exists" });
    // }

    const author = new Author({ name, birthYear, biography, books });
    const savedAuthor = await author.save();

    res.status(201).json(savedAuthor);
  } catch (error) {
    console.log("Create Author Error:", error);
    res.status(400).json({ message: "Error creating author", error });
  }
};

const updateAuthor = async (req, res) => {
  const { birthYear, biography, books } = req.body;

  try {
    const updated = await Author.findByIdAndUpdate(
      req.params.id,
      { birthYear, biography, books },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Author not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating author", error });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const deleted = await Author.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Author not found" });

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting author", error });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorByName,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
