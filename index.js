require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const bookRouter = require("./routes/book.route");
// express
const app = express();

// middlewares
app.use(express.json());
app.use(cors({ Credential: true }));

// port
const port = process.env.PORT || 8080;

// test api
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to our server!!" });
});

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

// uri
const uri = process.env.MONGODB_URI;

// db connection
mongoose
  .connect(uri)
  .then(() => {
    // listen
    app.listen(port, () => {
      console.log(`Your server is runing now on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
