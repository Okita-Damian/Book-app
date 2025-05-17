const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  birthYear: {
    type: Number,
    min: 0,
    max: new Date().getFullYear(),
  },
  biography: {
    type: String,
    default: "Biography not available",
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("Author", AuthorSchema);
