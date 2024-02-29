const express = require("express");

const router = express.Router();

router.post("/");
router.get("/");
router.get("/:bookid");
router.put("/:bookid");
router.delete("/:bookid");

module.exports = router;
