import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

import authRouter from "./routes/auth/auth.route";
import userRouter from "./routes/user/user.route";
import postRoute from "./routes/post/post.route";
import commentRoute from "./routes/comment/comment.route";
import likeRoute from "./routes/like/like.route";

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
