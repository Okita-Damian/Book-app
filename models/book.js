const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
  publishedYear: Number,
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  copiesAvailable: {
    type: Number,
    default: 1,
  },
  description: String,
  shelfLocation: String,
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
