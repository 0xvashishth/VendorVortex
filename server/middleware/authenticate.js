const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../database/userSchema');
const secret_key = process.env['SECRETKEYJWT'];

const Authenticate = async (req, res, next) => {
  try {
    const { jwttokenloginuser } = req.body;
    const token = jwttokenloginuser;
    const verifytoken = jwt.verify(token, secret_key);

    var rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token });

    if (!rootUser) {
        return res.status(401).json({ message: "User not found!" });
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
}

module.exports = Authenticate