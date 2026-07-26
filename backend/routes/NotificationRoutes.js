const express = require("express");

const {
    getNotifications,
    markAsRead,
    deleteNotification,
} = require("../controllers/NotificationController");
const { protect } = require("../middleware/AuthMiddleware");

const router = express.Router();
router.use(protect);

router.get("/", getNotifications);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

module.exports = router;