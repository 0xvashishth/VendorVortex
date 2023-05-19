const mongoose = require("mongoose");
const User = require("./userSchema");
const Shop = require("./shopSchema");
const { Schema } = mongoose;

const communitySchema = new mongoose.Schema({
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
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: User
      },
      stage: {
        type: Number,
        min: 0,
        max: 5
      }
    }
  ]
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
