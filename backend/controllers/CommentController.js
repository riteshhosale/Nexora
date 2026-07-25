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

const updateComment = async (req, res) => {
    try {
        const { text } = req.body;

        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this comment",
            });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await Post.findByIdAndUpdate(comment.post, {
            $inc: { commentsCount: -1 },
        });

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addComment,
    getComments,
    updateComment,
    deleteComment,
};


