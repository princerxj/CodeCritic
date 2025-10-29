const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");
const { authMiddleware } = require("./middleware/auth");
const { creditChecker } = require("./middleware/rateLimiter");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, CodeCritic Here");
});

app.use("/auth", authRoutes);

app.use("/ai", creditChecker, aiRoutes);

module.exports = app;
