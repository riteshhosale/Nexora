const Follow = require("../models/Follow");
const User = require("../models/User");
const Notification = require("../models/Notification");

const followUnfollowUser = async (req, res) => {
  try {
    // Prevent self follow
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing = currentUser.following.some(
      (id) => id.toString() === targetUser._id.toString(),
    );

    if (isFollowing) {
      currentUser.following.pull(targetUser._id);
      targetUser.followers.pull(currentUser._id);

      await currentUser.save();
      await targetUser.save();

      // Delete follow notification
      await Notification.findOneAndDelete({
        sender: currentUser._id,
        receiver: targetUser._id,
        type: "follow",
      });

      return res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
      });
    }

    currentUser.following.push(targetUser._id);
    targetUser.followers.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    // Create follow notification
    // Don't notify yourself
    if (currentUser._id.toString() !== targetUser._id.toString()) {
      await Notification.create({
        sender: currentUser._id,
        receiver: targetUser._id,
        type: "follow",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

module.exports = {
  followUnfollowUser,
};
