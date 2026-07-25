const express = require("express");
const router = express.Router();

const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    likeUnlikePost,
    saveUnsavePost,
} = require("../controllers/PostController");

const { protect } = require("../middleware/AuthMiddleware");

router.post("/", protect, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.put("/:id/like", protect, likeUnlikePost);
router.put("/:id/save", protect, saveUnsavePost);
module.exports = router;