const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/AuthMiddleware");

const {
    followUnfollowUser,
} = require("../controllers/FollowController");

router.put("/:id/follow", protect, followUnfollowUser);


module.exports = router;