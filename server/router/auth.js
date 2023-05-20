const express = require("express");
const router = express.Router();
// const connectDB = require('../config/db');
const User = require("../database/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { convertUserObjToRes } = require("../helper/converter");
// const mailsender = require('../middleware/mailer')

router.post("/signup", async (req, res) => {
  const { name, email, password, isVendor } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the properties" });
  }
  console.log("for signup..!");
  try {
    var emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email is already exist" });
    }

    var user = new User({ name, email, password, isVendor });

    var userRegister = await user.save();
    const token = await userRegister.generateAuthToken();
    if (userRegister && token) {
      return res.status(201).json({
        message: "User registered successfully",
        jwttokenloginuser: token,
        user: await convertUserObjToRes(userRegister),
      });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log("for signin..!");
  try {
    var emailExist = await User.findOne({ email: email });
    if (emailExist) {
      const isMatch = await bcrypt.compare(password, emailExist.password);

      const token = await emailExist.generateAuthToken();

      if (isMatch) {
        delete emailExist.tokens;
        return res.status(200).json({
          message: "You are logged in!",
          jwttokenloginuser: token,
          user: await convertUserObjToRes(emailExist),
        });
      } else {
        return res.status(401).json({ message: "Passwrd is incorrect!" });
      }
    } else {
      return res.status(401).json({ message: "You are not registered!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

module.exports = router;
