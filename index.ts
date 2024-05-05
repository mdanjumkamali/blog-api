import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
