require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// express
const app = express();

// middlewares
app.use(express.json());
app.use(cors({ Credential: true }));

// port
const port = process.env.PORT || 8080;

// listen
app.listen(port, () => {
  console.log(`Your server is runing now on port: ${port}`);
});

// uri
const uri = process.env.MONGODB_URI;

// db connection
mongoose
  .connect(uri)
  .then(() => {
    // test api
    app.get("/", (req, res) => {
      res.status(200).json({ message: "Welcome to our server!!!" });
    });
  })
  .catch((err) => {
    console.log(err);
  });
