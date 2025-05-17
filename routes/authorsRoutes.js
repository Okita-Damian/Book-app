const express = require("express");

const {
  getAllAuthors,
  getAuthorByName,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

const { validateAuthor } = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/", getAllAuthors), router.get("/:name", getAuthorByName);

router.post("/", validateAuthor, createAuthor);

router.put("/:id", validateAuthor, updateAuthor);

router.delete("/:id", deleteAuthor);

module.exports = router;
