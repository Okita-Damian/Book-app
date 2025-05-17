const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: [true, "Genre name is required"],
    unique: true,
    minlength: [3, "Genre name must be at least 3 characters long"],
    maxlength: [50, "Genre name cannot be more than 50 characters long"],
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("Genre", GenreSchema);
