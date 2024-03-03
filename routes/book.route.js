const express = require("express");
const {
  createBook,
  getAllBook,
  getABook,
  updateABook,
  deleteABook,
} = require("../controllers/book.controller");

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBook);
router.get("/:bookid", getABook);
router.put("/:bookid", updateABook);
router.delete("/:bookid", deleteABook);

module.exports = router;
