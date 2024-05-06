import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRouter from "./routes/auth/auth.route";
import postRoute from "./routes/post/post.route";
import commentRoute from "./routes/comment/comment.route";
import likeRoute from "./routes/like/like.route";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likeRoute);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
