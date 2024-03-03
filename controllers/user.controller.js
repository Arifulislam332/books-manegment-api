const { default: mongoose } = require("mongoose");
const userModel = require("../models/user.model");
const { use } = require("../routes/auth.route");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
};

const getAnUser = async (req, res) => {
  try {
    const { userid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userid)) {
      throw new Error("User not found!");
    }

    const user = await userModel.findById(userid);

    if (!user) {
      throw new Error("User not found!");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
};

module.exports = { getAllUsers, getAnUser };
