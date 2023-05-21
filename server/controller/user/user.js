const User = require("../../database/userSchema");
const Community = require("../../database/communitySchema");
const Plan = require("../../database/planSchema");
const Shop = require("../../database/shopSchema");
let mongoose = require("mongoose");
const { convertUserObjToRes } = require("../../helper/converter");

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    var userExist = User.updateOne(
      { _id: req.userId },
      { $set: { email, name } }
    );
    if (userExist) {
      return res
        .status(200)
        .json({
          message: "Profile updated successfully!",
          user: await convertUserObjToRes(userExist),
        });
    } else {
      return res.status(401).json({ message: "Failed to update profile!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const deleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await Community.deleteMany({ owner: req.userId });
    await Plan.deleteMany({ ownerl: req.userId });
    await Community.updateMany(
      {},
      { $pull: { members: { user: req.userId } } }
    );
    await Shop.deleteMany({ owner: eq.userId });
    await User.deleteOne({ _id: req.userId });

    await session.commitTransaction();
    return res.status(200).json({ message: "User deleted Sucessfully!" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "communities",
          localField: "_id",
          foreignField: "owner",
          as: "communities",
        },
      },
      {
        $lookup: {
          from: "shops",
          localField: "_id",
          foreignField: "owner",
          as: "shops",
        },
      },
      // {
      //   $match: { "communities.0": { $exists: true } },
      // },
      {
        $project: {
          name: 1,
          email: 1,
          communities: {
            name: 1,
            description: 1,
            _id: 1,
            memberCount: { $size: "$communities.members" },
          },
          shops: {
            name: 1,
            description: 1,
            city: 1,
            _id: 1,
            country: 1,
            isVerified: 1,
            images: 1,
          },
        },
      },
    ]).exec((err, result) => {
      if (err) {
        // Handle error
        console.error("Error retrieving user details:", err);
        return res.status(500).json({ message: "Server Error!" });
      }

      if (!result || result.length === 0) {
        // User not found
        return res.status(404).json({ message: "User not found." });
      }

      // User details including communities and shop details
      const user = result[0];
      return res.status(200).json({  message: "User retrived!", user });
    });
  } catch (error) {
    console.log("Error retrieving user details:", error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUserById,
};
