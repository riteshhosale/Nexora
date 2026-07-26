const Like = require("../models/Like");
const Post = require("../models/Post");
const Notification = require("../models/Notification");

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

    const isLiked = post.likes.some((id) => id.toString() === userId);

    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);

      // Delete notification
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

    post.likes.push(req.user._id);

    await post.save();

    // Don't notify yourself
    if (post.author.toString() !== userId) {
      await Notification.create({
        sender: req.user._id,
        receiver: post.author,
        post: post._id,
        type: "like",
      });
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
