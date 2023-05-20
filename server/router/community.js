const express = require("express");
const router = express.Router();
const community = require("../controller/community/community");
const Authenticate = require("../middleware/authenticate"); // authentication middlewarwe
const {
  veifyShopAuthenticUser,
  verifyIsVendor,
  veifyCommunityAuthenticUser
} = require("../middleware/verifyAuthetication"); // other middlewares

router.post("/", Authenticate, verifyIsVendor, veifyShopAuthenticUser, community.createCommunity); // only vendor can create the community
router.put("/", Authenticate, veifyCommunityAuthenticUser, community.updateCommunity); // only owner can change the shop details
router.put("/enroll", Authenticate, community.enrollInCommunity); // any user can enroll the community
router.put("/unenroll", Authenticate, community.unenrollInCommunity); // any user can unenroll the community
router.delete("/", Authenticate, veifyCommunityAuthenticUser, community.deleteCommunity); // only the owner can delete the community and this will delete all other relative information about the shop from all schemas
router.get("/:id", community.getCommunityById); // anyone can access the community details by it's id

module.exports = router;