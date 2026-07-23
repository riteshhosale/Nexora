const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/AuthMiddleware");

const {
    register,
    login,
    getMe,
} = require("../controllers/AuthController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;