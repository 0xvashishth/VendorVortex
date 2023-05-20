// const User = require("../../database/userSchema");
const Community = require("../../database/communitySchema");
const Plan = require("../../database/planSchema");
const Shop = require("../../database/shopSchema");
let mongoose = require("mongoose");

const createPlan = async (req, res) => {
  const { name, description, shopId } = req.body;
  if (!name || !description || !req.userId || !shopId) {
    return res.status(400).json({ message: "All fields are erquired!" });
  }
  try {
    var plan = new Plan({
      name,
      description,
      owner: req.userId,
      shop: mongoose.Types.ObjectId(shopId),
    });
    var planCreate = await plan.save();
    if (planCreate) {
      //   mailsender.sendmailer(
      //     email,
      //     name
      //   );
      return res.status(201).json({
        message: "Plan created successfully",
        plan: planCreate,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const updatePlan = async (req, res) => {
  const { planId, name, description } = req.body;
  try {
    var planExist = Plan.updateOne(
      { _id: mongoose.Types.ObjectId(planId) },
      { $set: { name, description } }
    );
    if (planExist) {
      return res.status(200).json({
        message: "Plan updated successfully!",
        plan: planExist,
      });
    } else {
      return res.status(401).json({ message: "Failed to update plan!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const deletePlan = async (req, res) => {
  const session = await mongoose.startSession();
  const { planId } = req.body;
  try {
    session.startTransaction();

    await Plan.deleteOne({ _id: mongoose.Types.ObjectId(planId) });

    await session.commitTransaction();
    return res.status(200).json({ message: "Plan deleted Sucessfully!" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const getPlanById = async (req, res) => {
  const planId = req.params.id;
  try {
    Plan.findOne({ _id: planId })
      .populate("owner", "name email")
      .populate("shop")
      .exec((err, plan) => {
        if (err) {
          // Handle error
          console.error("Error retrieving plan details:", err);
          return res.status(500).json({ message: "Server Error!" });
        }

        if (!plan) {
          // Plan not found
          return res.status(404).json({ message: "Plan not found." });
        }

        // Plan details including owner and shop
        return res.status(200).json({ message: "Plan retrived sucessfully.", plan });
      });
  } catch (error) {
    console.log("Error retrieving plan details:", error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

module.exports = {
  createPlan,
  updatePlan,
  deletePlan,
  getPlanById,
};
