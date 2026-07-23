const User = require("../models/User");
const generateToken = require("../utils/GenerateToken");

const register = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const exists = await User.findOne({ $or: [{ email }, { username }] });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User with this email or username already exists",
            });
        }

        const user = await User.create({
            fullName,
            username,
            email,
            password,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const bcrypt = require("bcryptjs");
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id);

        user.password = undefined;

        res.json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
};
