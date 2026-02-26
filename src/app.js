const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration (ONLY ONCE)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Body Parser
app.use(express.json());

// app.use(
//   mongoSanitize({
//     replaceWith: "_",
//   })
// );

// Prevent XSS
// app.use(xss());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).send("LifeLink API Running Securely");
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;