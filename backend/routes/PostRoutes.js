const express = require("express");
const router = express.Router();

const {
    createPost,
    getPost,
} = require("../controllers/PostController");

const { protect } = require("../middleware/AuthMiddleware");

router.post("/", protect, createPost);
router.get("/", getPost);

module.exports = router;