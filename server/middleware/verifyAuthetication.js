const Plan = require("../database/planSchema");
const Shop = require("../database/shopSchema");
const User = require("../database/userSchema");
let mongoose = require("mongoose");

const veifyShopAuthenticUser = async (req, res, next) => {
  try {
    const { shopId } = req.body;

    var shopObj = await Shop.findOne({
      _id: mongoose.Types.ObjectId(shopId),
      owner: req.userId,
    });

    if (!shopObj) {
      return res
        .status(401)
        .json({
          message: "Shop not found or You are not authorized for this action!",
        });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

const veifyPlanAuthenticUser = async (req, res, next) => {
  try {
    const { planId } = req.body;

    var planObj = await Plan.findOne({
      _id: mongoose.Types.ObjectId(planId),
      owner: req.userId,
    });

    if (!planObj) {
      return res
        .status(401)
        .json({
          message: "Plan not found or You are not authorized for this action!",
        });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};


module.exports = {
    veifyPlanAuthenticUser,
    veifyShopAuthenticUser
}