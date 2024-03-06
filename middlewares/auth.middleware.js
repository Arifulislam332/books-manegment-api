const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    // req.headers.authorization = `Bearer token`
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new Error("Invalid token format");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("No token provided");
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(_id);

    next();
  } catch (error) {
    if (!error.name === "JsonWebTokenError") {
      res.status(403).json({ error: error.message });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
};

module.exports = isAuthenticated;
