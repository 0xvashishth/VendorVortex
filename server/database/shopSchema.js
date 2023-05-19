const mongoose = require("mongoose");
const User = require("./userSchema");
const { Schema } = mongoose;

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: User,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
    },
  ],
  isVerified: {
    type: Boolean,
  },
  isCommunity: {
    type: Boolean,
  },
  images: [
    {
      url: {
        type: String,
      },
    },
  ],
});

// Initially Unverified..! Afterwards we can modify it!
shopSchema.pre("save", async function (next) {
  if (!this.isModified("isVerified")) {
    return next();
  }
  this.isVerified = false;
  next();
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
