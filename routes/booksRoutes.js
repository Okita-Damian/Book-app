const express = require("express");

const {
  getAllBooks,
  getBookByName,
  createBook,
  updateBookById,
  deleteBookById,
} = require("../controllers/bookController");

const { validateBook } = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:name", getBookByName);

router.post("/", validateBook, createBook);

router.put("/:id", validateBook, updateBookById);

router.delete("/:id", deleteBookById);

module.exports = router;
