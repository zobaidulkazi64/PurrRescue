import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import error = require("./utils/error");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

// routes

//  handler
app.use(error.notFound);
app.use(error.serverError);

const port = process.env.PORT || 8080;
const serviceName = process.env.SERVICE_NAME || "Api-Gateway-Service";

app.listen(port, () => {
  console.log(`${serviceName} is running on port ${port}`);
});
