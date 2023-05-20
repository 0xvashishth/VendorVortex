const Plan = require("../database/planSchema");
const Shop = require("../database/shopSchema");
const User = require("../database/userSchema");
const Community = require("../database/communitySchema");
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
        .status(404)
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
        .status(404)
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

const veifyCommunityAuthenticUser = async (req, res, next) => {
  try {
    const { communityId } = req.body;

    var communityObj = await Community.findOne({
      _id: mongoose.Types.ObjectId(communityId),
      owner: req.userId,
    });

    if (!communityObj) {
      return res
        .status(404)
        .json({
          message: "Community not found or You are not authorized for this action!",
        });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

const verifyIsVendor = async (req, res) => {
  try {
    const { rootUser } = req.body;

    if (!rootUser.isVendor) {
      return res
        .status(400)
        .json({
          message: "You are not vendor!",
        });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
}

module.exports = {
    veifyPlanAuthenticUser,
    veifyShopAuthenticUser,
    veifyCommunityAuthenticUser,
    verifyIsVendor
}