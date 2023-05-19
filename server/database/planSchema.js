const mongoose = require("mongoose");
const User = require("./userSchema");
const Shop = require("./shopSchema");
const { Schema } = mongoose;

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: Shop,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  }
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
