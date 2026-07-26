const express = require("express");
const router = express.Router();

const upload = require("../middleware/UploadMiddleware");
const { protect } = require("../middleware/AuthMiddleware");

const {
    getUserProfile,
    updateProfile,
    followUnfollowUser,
    updateProfilePicture,
} = require("../controllers/UserController");

router.get("/:username", protect, getUserProfile);
router.put("/profile", protect, updateProfile);

router.put(
    "/profile-picture",
    protect,
    upload.single("image"),
    updateProfilePicture
);

module.exports = router;