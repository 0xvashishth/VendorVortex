const express = require("express");
const router = express.Router();
const Authenticate = require("../middleware/authenticate");
const user = require("../controller/user/user");

router.put("/", Authenticate, user.updateUser);
router.delete("/", Authenticate, user.deleteUser);
router.get("/:id", user.getUserById);

module.exports = router;
