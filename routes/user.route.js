const express = require("express");

const router = express.Router();

router.get("/");
router.get("/:userid");

module.exports = router;
