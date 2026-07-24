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

const getPosts = async (req, res) => {
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

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        .populate("author", "fullName username profilePicture");

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { caption, images } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post",
            });
        }
        post.caption = caption || post.caption;
        post.isEdited = true;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this post",
            });
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
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
    getPosts,
    getPost,
    updatePost,
    deletePost,
};
