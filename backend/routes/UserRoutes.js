const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/AuthMiddleware");

const {
    getUserProfile,
    updateProfile,
    followUnfollowUser,
} = require("../controllers/UserController");

router.get("/:username", protect, getUserProfile);
router.put("/profile", protect, updateProfile);
router.put("/:id/follow", protect, followUnfollowUser);

module.exports = router;