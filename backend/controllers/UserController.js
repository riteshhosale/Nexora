const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/AuthMiddleware");

const {
    getUserProfile,
    updateUserProfile,
} = require("../controllers/UserController");

router.get("/:username", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;