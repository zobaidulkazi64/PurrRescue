// express server for notification service
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors());
app.use(morgan("dev"));

dotenv.config();

const port = process.env.PORT || 4004;

// app.listen(port, () => {
//   console.log(`Notification service listening on port ${port}`);
// });

app.get("/", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

export default app;
