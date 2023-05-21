const express = require("express");
const router = express.Router();
const shop = require("../controller/shop/shop");
const Authenticate = require("../middleware/authenticate"); // authentication middlewarwe
const {
  veifyShopAuthenticUser,
  verifyIsVendor,
} = require("../middleware/verifyAuthetication"); // other middlewares

router.post("/", Authenticate, verifyIsVendor, shop.createShop); // only vendor can create the shop
router.put("/", Authenticate, veifyShopAuthenticUser, shop.updateShop); // only owner can change the shop details
router.put("/rating", Authenticate, shop.updateRatings); // any user can rate the shop
router.delete("/", Authenticate, veifyShopAuthenticUser, shop.deleteShop); // only the owner can delete the shop andf this will delete all other relative information about the shop from all schemas
router.get("/allshops", shop.getAllShops); // anyone can get the details of all shops
router.get("/:id", shop.getShopById); // anyone can access the shop details by it's id

module.exports = router;