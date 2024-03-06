const express = require("express");
const {
  createBook,
  getAllBook,
  getABook,
  updateABook,
  deleteABook,
} = require("../controllers/book.controller");
const isAuthenticated = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllBook);
router.get("/:bookid", getABook);
router.put("/:bookid", updateABook);
router.delete("/:bookid", deleteABook);
router.post("/", isAuthenticated, createBook);

module.exports = router;
