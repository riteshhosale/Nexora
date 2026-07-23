const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/AuthMiddleware");

const {
    getUserProfile,
    updateProfile,
} = require("../controllers/UserController");

// Get user profile
router.get("/:username", protect, getUserProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateProfile);

module.exports = router;