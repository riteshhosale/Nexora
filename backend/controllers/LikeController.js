const Like = require("../models/Like");
const Post = require("../models/Post");
const Notification = require("../models/Notification");
const { getIO } = require("../config/socket");
const { getUserSocket } = require("../socket/users");

const likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const userId = req.user._id.toString();

        const isLiked = post.likes.some(
            (id) => id.toString() === userId
        );

        // =======================
        // UNLIKE
        // =======================
        if (isLiked) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId
            );

            await Notification.findOneAndDelete({
                sender: req.user._id,
                receiver: post.author,
                post: post._id,
                type: "like",
            });

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post unliked successfully",
                likesCount: post.likes.length,
            });
        }

        // =======================
        // LIKE
        // =======================
        post.likes.push(req.user._id);

        await post.save();

        if (post.author.toString() !== userId) {

            const notification = await Notification.create({
                sender: req.user._id,
                receiver: post.author,
                post: post._id,
                type: "like",
            });

            const populatedNotification = await Notification.findById(notification._id)
                .populate("sender", "name username profilePicture")
                .populate("post", "image caption");

            const receiverSocket = getUserSocket(post.author.toString());

            if (receiverSocket) {
                const io = getIO();
                io.to(receiverSocket).emit(
                    "newNotification",
                    populatedNotification
                );
            }
        }

        return res.status(200).json({
            success: true,
            message: "Post liked successfully",
            likesCount: post.likes.length,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    likeUnlikePost,
};