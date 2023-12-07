const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");

// reqistration
router.post("/signup", async (req, res, next) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    // save new user and respond
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// login
router.post("/login", async (req, res, next) => {
  try {
    // get user
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(404).json("user not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("wrong password");
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
