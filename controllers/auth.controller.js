const validator = require("validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // checking required fields
    if (!name || !email || !password)
      throw new Error("Name, email and password is required!");

    // validate Email
    if (!validator.isEmail(email)) throw new Error("Invalidate Email!");

    // validate Password
    if (!validator.isStrongPassword(password))
      throw new Error(
        "Password must contain 8+ chars, lowercase, uppercase, numeric and symbol"
      );

    // check if the user exists or not
    const isExist = await userModel.findOne({ email });

    if (isExist) throw new Error("Email already in use!");

    // password encryption
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create an user
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // required fields
    if (!email || !password) throw new Error("Email and password is required!");

    // check if the user exists or not
    const user = await userModel.findOne({ email });

    if (!user) throw new Error("User not found!");

    // password decryption
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("User not found!");

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser };
