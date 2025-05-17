const express = require("express");
const app = express();
const dotenv = require("dotenv");
const booksRoutes = require("./routes/booksRoutes");
const memberRoutes = require("./routes/membersRoute");
const authorRoutes = require("./routes/authorsRoutes");
const genreRoutes = require("./routes/genresRoutes");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((error) => console.error("Connection error:", error));

//middleware
app.use(express.json());

//Routes
app.use("/books", booksRoutes);
app.use("/members", memberRoutes);
app.use("/authors", authorRoutes);
app.use("/genres", genreRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}....`));
