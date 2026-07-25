const User = require("../models/User");

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
        const {
            fullName,
            bio,
            website,
            location,
        } = req.body;

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

module.exports = {
    getUserProfile,
    updateProfile,
    followUnfollowUser,
};