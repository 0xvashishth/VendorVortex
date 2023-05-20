const express = require("express");
const router = express.Router();
const plan = require("../controller/plan/plan");
const Authenticate = require("../middleware/authenticate"); // authentication middlewarwe
const {
  veifyShopAuthenticUser,
  veifyPlanAuthenticUser,
  verifyIsVendor,
} = require("../middleware/verifyAuthetication"); // other middlewares

router.post("/", Authenticate, verifyIsVendor, veifyShopAuthenticUser, plan.createPlan); // only vendor can create the plan of the shop
router.put("/", Authenticate, veifyPlanAuthenticUser, plan.updatePlan); // only owner can change the plan details
router.delete("/", Authenticate, veifyPlanAuthenticUser, plan.deletePlan); // only the owner can delete the plan and this will delete all other relative information about the shop from all schemas
router.get("/:id", plan.getPlanById); // anyone can access the plan details by it's id

module.exports = router;