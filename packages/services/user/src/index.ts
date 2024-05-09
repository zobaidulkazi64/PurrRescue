import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import error = require("./utils/error");

import router from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

// routes

app.use("/auth", router);

//  handler
app.use(error.notFound);
app.use(error.serverError);
app.use(error.invalidInput);
app.use(error.unauthorized);

const port = process.env.PORT || 4000;
const serviceName = process.env.SERVICE_NAME || "User-Service";

app.listen(port, () => {
  console.log(`${serviceName} is running on port ${port}`);
});
