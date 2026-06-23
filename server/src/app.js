const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const videoRoutes = require("./routes/video.routes");
const commentRoutes = require("./routes/comment.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const subscriptionRoutes = require( "./routes/subscription.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/videos", videoRoutes);

app.use("/api/comments",commentRoutes);

app.use("/api/dashboard",dashboardRoutes);

app.use("/api/subscriptions", subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("Video Streaming API Running");
});

module.exports = app;