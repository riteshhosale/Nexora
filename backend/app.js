const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config({ path: "./.env" });

const AuthRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const notificationRoutes = require("./routes/NotificationRoutes");
const likeRoutes = require("./routes/LikeRoutes");
const followRoutes = require("./routes/FollowRoutes");

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Test Route
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Nexora backend running",
  });
});

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/posts", commentRoutes);
app.use("/api/v1/posts", likeRoutes);
app.use("/api/v1/users", followRoutes);
app.use("/api/v1/notifications", notificationRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;