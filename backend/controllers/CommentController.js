const Comment = require("../models/Comment");
const Post = require("../models/Post");
const Notification = require("../models/Notification");
const { getIO } = require("../config/socket");
const { getUserSocket } = require("../socket/users");

const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Create comment
    const comment = await Comment.create({
      post: post._id,
      user: req.user._id,
      text,
    });

    // Update comment count
    post.commentsCount += 1;
    await post.save();

    // Populate comment
    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "fullName username profilePicture");

    // ==========================
    // Notification + Socket.IO
    // ==========================
    if (post.author.toString() !== req.user._id.toString()) {

      const notification = await Notification.create({
        sender: req.user._id,
        receiver: post.author,
        post: post._id,
        type: "comment",
      });

      const populatedNotification = await Notification.findById(notification._id)
        .populate("sender", "fullName username profilePicture")
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

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
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

    const post = await Post.findById(comment.post);

    await Notification.findOneAndDelete({
      sender: comment.user,
      receiver: post.author,
      post: post._id,
      type: "comment",
    });

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
