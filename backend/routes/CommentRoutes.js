const express = require("express");
const router = express.Router();

const {
    addComment,
    getComments,
} = require("../controllers/CommentController");

const { protect } = require("../middleware/AuthMiddleware");

router.post("/:id/comments", protect, addComment);
router.get("/:id/comments", getComments);

module.exports = router;