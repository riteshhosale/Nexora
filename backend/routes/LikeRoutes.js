const express = require("express");
const router = express.Router();

const {
    likeUnlikePost,
} = require("../controllers/LikeController");

const { protect } = require("../middleware/AuthMiddleware");

router.put("/:id/like", protect, likeUnlikePost);
module.exports = router;