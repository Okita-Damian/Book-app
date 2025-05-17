const Book = require("../models/book");
const Genre = require("../models/genre");
const Author = require("../models/author");
const BookSchema = require("../validation/bookValidation");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

const getBookByName = async (req, res) => {
  try {
    const book = await Book.findOne({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (!book) return res.status(404).json({ message: "Book is not found" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the book", error });
  }
};

const createBook = async (req, res) => {
  try {
    const { error, value } = BookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existing = await Book.findOne({ name: value.name });
    if (existing) {
      return res.status(400).json({ error: "Book name already exist" });
    }

    // const {
    //   name,
    //   title,
    //   isbn,
    //   authors,
    //   genres,
    //   publishedYear,
    //   copiesAvailable,
    //   description,
    //   shelfLocation,
    // } = value;

    // const newBook = await Book.create({
    //   name,
    //   title,
    //   isbn,
    //   authors,
    //   genres,
    //   publishedYear,
    //   copiesAvailable,
    //   description,
    //   shelfLocation,
    // });

    const newBook = await Book.create(value);

    await Genre.updateMany(
      { _id: { $in: value.genres } },
      { $push: { books: newBook._id } }
    );

    await Author.updateMany(
      { _id: { $in: value.authors } },
      { $push: { books: newBook._id } }
    );
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBookById = async (req, res) => {
  try {
    const { error, value } = BookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true,
    });
    // const {
    //   name,
    //   title,
    //   isbn,
    //   authors,
    //   genres,
    //   publishedYear,
    //   copiesAvailable,
    //   description,
    //   shelfLocation,
    // } = req.body;

    // const updatedBook = await Book.findOneAndUpdate(
    //   { name: req.params.name },
    //   {
    //     name,
    //     title,
    //     isbn,
    //     authors,
    //     genres,
    //     publishedYear,
    //     copiesAvailable,
    //     description,
    //     shelfLocation,
    //   },
    //   { new: true, runValidators: true }
    // );

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted", deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

module.exports = {
  getAllBooks,
  getBookByName,
  createBook,
  updateBookById,
  deleteBookById,
};
