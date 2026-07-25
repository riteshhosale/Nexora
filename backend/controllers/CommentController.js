const Comment = require("../models/Comment");
const Post = require("../models/Post");

const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const comment = await Comment.create({
            post: post._id,
            user: req.user._id,
            text,
        });
        
        post.commentsCount += 1;
        await post.save();

        const populatedComment = await Comment.findById(comment._id)
            .populate("user", "fullName username profilePicture");

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: populatedComment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.id,
        })
        .populate("user", "fullName username profilePicture")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            comments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

module.exports = {
    addComment,
    getComments,
};