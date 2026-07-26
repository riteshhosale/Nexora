const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const { uploadImage } = require("../services/cloudinaryService");

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username.toLowerCase(),
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, website, location } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullName = fullName || user.fullName;
    user.bio = bio || user.bio;
    user.website = website || user.website;
    user.location = location || user.location;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow/unfollow yourself",
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

    const isFollowing = currentUser.following.includes(targetUser._id);

    if (isFollowing) {
      currentUser.following.pull(targetUser._id);
      targetUser.followers.pull(currentUser._id);

      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
      });
    }

    currentUser.following.push(targetUser._id);
    targetUser.followers.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Buffer size:", req.file.buffer.length);
    console.log("Starting Cloudinary upload...");

    // Delete old image
    if (user.profilePicture?.public_id) {
      try {
        await cloudinary.uploader.destroy(user.profilePicture.public_id);
      } catch (err) {
        console.log("Failed to delete old image:", err.message);
      }
    }

    // Upload new image
    const result = await uploadImage(
      req.file.buffer,
      "nexora/profile-pictures",
    );

    user.profilePicture = {
      url: result.url,
      public_id: result.public_id,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  followUnfollowUser,
  updateProfilePicture,
};
