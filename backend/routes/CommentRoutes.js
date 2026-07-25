const express = require("express");
const router = express.Router();

const {
    addComment,
    getComments,
    updateComment,
    deleteComment,
} = require("../controllers/CommentController");

const { protect } = require("../middleware/AuthMiddleware");

router.post("/:id/comments", protect, addComment);
router.put("/:id/comments/:commentId", protect, updateComment);
router.delete("/:id/comments/:commentId", protect, deleteComment);
router.get("/:id/comments", getComments);


module.exports = router;