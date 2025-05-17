const Joi = require("joi");
const mongoose = require("mongoose");

const ObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("invalid ObjectId");
  }
  return value;
};

const BookSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().label("Book Name"),
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(1000).optional(),
  authors: Joi.array()
    .items(Joi.string().custom(ObjectId))
    .required()
    .default([]),
  isbn: Joi.string().optional(),
  publishedYear: Joi.number()
    .integer()
    .min(0)
    .max(new Date().getFullYear() + 5),
  shelfLocation: Joi.string().optional(),
  copiesAvailable: Joi.number().min(0).optional(),
  genres: Joi.array()
    .items(Joi.string().custom(ObjectId))
    .required()
    .default([]),
});

module.exports = BookSchema;
