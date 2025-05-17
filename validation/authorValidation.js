const Joi = require("joi");

const mongoose = require("mongoose");

const ObjectId = (a, b) => {
  if (!mongoose.Types.ObjectId.isValid(a)) {
    return b.message("Invalid objectId");
  }
  return a;
};

const AuthorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  birthYear: Joi.number().integer().min(0).max(new Date().getFullYear()),
  biography: Joi.string().max(1000),
  books: Joi.array().items(Joi.string().custom(ObjectId)).default([]),
});

module.exports = AuthorSchema;
