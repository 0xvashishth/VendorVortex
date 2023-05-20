// const User = require("../../database/userSchema");
const Community = require("../../database/communitySchema");
const Plan = require("../../database/planSchema");
const Shop = require("../../database/shopSchema");
let mongoose = require("mongoose");

const createCommunity = async (req, res) => {
  const { name, description, shopId } = req.body;
  if (!name || !description || !req.userId || !shopId) {
    return res.status(400).json({ message: "All fields are erquired!" });
  }
  try {
    var community = new Community({
      name,
      description,
      owner: req.userId,
      shop: mongoose.Types.ObjectId(shopId),
    });
    var communityCreate = await community.save();
    if (communityCreate) {
      //   mailsender.sendmailer(
      //     email,
      //     name
      //   );
      return res.status(201).json({
        message: "Community created successfully",
        community: communityCreate,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const updateCommunity = async (req, res) => {
  const { communityId, name, description } = req.body;
  try {
    var communityExist = Community.updateOne(
      { _id: mongoose.Types.ObjectId(communityId) },
      { $set: { name, description } }
    );
    if (communityExist) {
      return res.status(200).json({
        message: "Community updated successfully!",
        community: communityExist,
      });
    } else {
      return res.status(401).json({ message: "Failed to update community!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const deleteCommunity = async (req, res) => {
  const session = await mongoose.startSession();
  const { communityId } = req.body;
  try {
    session.startTransaction();

    await Community.deleteOne({ _id: mongoose.Types.ObjectId(communityId) });

    await session.commitTransaction();
    return res.status(200).json({ message: "Community deleted Sucessfully!" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const getCommunityById = async (req, res) => {
  const communityId = req.params.id;
  try {
    Community.findOne({ _id: communityId })
      .populate("owner", "name email")
      .populate("shop")
      .exec((err, community) => {
        if (err) {
          // Handle error
          console.error("Error retrieving community details:", err);
          return res.status(500).json({ message: "Server Error!" });
        }

        if (!community) {
          // Plan not found
          return res.status(404).json({ message: "Community not found." });
        }

        // Plan details including owner and shop
        return res
          .status(200)
          .json({ message: "Community retrived sucessfully.", community });
      });
  } catch (error) {
    console.log("Error retrieving community details:", error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

module.exports = {
  createCommunity,
  updateCommunity,
  deleteCommunity,
  getCommunityById,
};
