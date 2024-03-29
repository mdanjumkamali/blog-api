import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/", userRouter);
app.use("/api/", postRouter);

app.listen(PORT, () => {
  console.log(`app listening on port http://localhost:${PORT}`);
});
