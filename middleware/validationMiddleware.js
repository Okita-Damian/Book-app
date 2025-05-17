const authorSchema = require("../validation/authorValidation");
const bookSchema = require("../validation/bookValidation");

const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateAuthor = (req, res, next) => {
  const { error } = authorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateAuthor,
  validateBook,
};
