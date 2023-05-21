// const User = require("../../database/userSchema");
const Community = require("../../database/communitySchema");
const Plan = require("../../database/planSchema");
const Shop = require("../../database/shopSchema");
let mongoose = require("mongoose");

const createShop = async (req, res) => {
  const {
    name,
    description,
    fullAddress,
    city,
    state,
    country,
    pincode,
    images,
  } = req.body;
  console.log(req.body);
  if (
    !name ||
    !description ||
    !req.userId ||
    !fullAddress ||
    !city ||
    !state ||
    !country ||
    !pincode
  ) {
    return res.status(400).json({ message: "All fields are erquired!" });
  }
  try {
    var shop = new Shop({
      name,
      description,
      owner: req.userId,
      fullAddress,
      city,
      state,
      country,
      pincode,
      images,
    });
    var shopCreate = await shop.save();
    if (shopCreate) {
      //   mailsender.sendmailer(
      //     email,
      //     name
      //   );
      return res.status(201).json({
        message: "Shop created successfully",
        shop: shopCreate,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const updateShop = async (req, res) => {
  const { shopId, name, description } = req.body;
  try {
    var shopExist = Shop.updateOne(
      { _id: mongoose.Types.ObjectId(shopId) },
      { $set: { name, description } }
    );
    if (shopExist) {
      return res.status(200).json({
        message: "Shop updated successfully!",
        shop: shopExist,
      });
    } else {
      return res.status(401).json({ message: "Failed to update shop!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const deleteShop = async (req, res) => {
  const session = await mongoose.startSession();
  const { shopId } = req.body;
  try {
    session.startTransaction();

    await Community.deleteMany({ shop: mongoose.Types.ObjectId(shopId) });
    await Plan.deleteMany({ shop: mongoose.Types.ObjectId(shopId) });
    await Shop.deleteOne({ _id: mongoose.Types.ObjectId(shopId) });

    await session.commitTransaction();
    return res.status(200).json({ message: "Shop deleted Sucessfully!" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const getShopById = async (req, res) => {
  const shopId = req.params.id;
  try {
    Shop.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(shopId) },
      },
      {
        $lookup: {
          from: "plans",
          let: { shopId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$shop", "$$shopId"],
                },
              },
            },
          ],
          as: "plans",
        },
      },
      {
        $lookup: {
          from: "communities",
          let: { shopId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$shop", "$$shopId"],
                },
              },
            },
          ],
          as: "communities",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
        },
      },
      {
        $project: {
          // Include all fields from the shop collection
          // Adjust the field names as per your schema
          name: 1,
          description: 1,
          owner: 1,
          fullAddress: 1,
          city: 1,
          state: 1,
          country: 1,
          pincode: 1,
          ratings: 1,
          isVerified: 1,
          isCommunity: 1,
          images: 1,
          plans: 1,
          communities: {
            name: 1,
            description: 1,
            _id: 1,
          },
          ownerDetails: {
            name: 1,
            email: 1,
          },
        },
      },
    ]).exec((err, result) => {
      if (err) {
        // Handle error
        console.error("Error retrieving shop details:", err);
        return res.status(500).json({ message: "Server Error!", error: err });
      }

      if (!result || result.length === 0) {
        // Shop not found
        return res.status(404).json({ message: "Shop not found." });
      }

      // Shop details including plans, communities, and owner details
      const shop = result[0];
      return res.status(200).json({ shop, message: "Shop data retrived!" });
    });
  } catch (error) {
    console.log("Error retrieving shop details:", error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const updateRatings = async (req, res) => {
  const { rating, comment, shopId } = req.body;
  if (rating > 5 || rating < 1) {
    return res
      .status(400)
      .json({ message: "Rating can not be more than 5 or less than 1!" });
  }
  try {
    Shop.findById(shopId)
      .then((shop) => {
        if (!shop) {
          return res.status(404).json({ message: "Shop not found" });
        }

        shop.addRating(req.userId, rating, comment);

        return shop.save();
      })
      .then((updatedShop) => {
        return res.status(200).json({ shop: updatedShop, message: "Ratings added successfully!" });
      })
      .catch((error) => {
        console.error("Error adding shop rating:", error);
        return res.status(400).json({ message: "You have already rated this shop! checkout below ✅", error });
      });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const getAllShops = async (req, res) => {
  console.log("here");
  try {
    const shops = await Shop.find();
    console.log(shops);
    res.status(200).json({ message: "Shops retrieved successfully", shops });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!", error });
  }
}

module.exports = {
  createShop,
  updateShop,
  deleteShop,
  getShopById,
  getAllShops,
  updateRatings
};
