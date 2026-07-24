const Post = require("../models/Post");

const createPost = async (req, res) => {
    try {
    const { caption, images } = req.body;

    const post = await Post.create({
        author: req.user._id,
        caption,
        images,
    });

    const populatedPost = await Post.findById(post._id).populate(
        "author",
        "fullName username profilePicture"
    );
    res.status(201).json({
        success: true,
        message: "Post created successfully",
        post: populatedPost,
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

const getPost = async (req, res) => {
    try {
        const posts = await Post.find()
        .populate("author", "fullName username profilePicture")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

module.exports = {
    createPost,
    getPost,
};