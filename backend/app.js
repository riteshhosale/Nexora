const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { Db } = require("mongodb");
require("dotenv").config({ path: "./.env" });

const AuthRoutes = require("./routes/AuthRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Nexora backend running" });
});

app.use("/api/v1/auth", AuthRoutes);

module.exports = app;
