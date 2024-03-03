const express = require("express");
const { getAllUsers, getAnUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userid", getAnUser);

module.exports = router;
