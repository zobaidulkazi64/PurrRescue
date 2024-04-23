import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import error = require("./utils/error");
import { configureRoutes } from "@/utils/apiConfigRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// security
app.use(helmet());

// red limit for api middleware

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  handler: (_req, res, _next) => {
    res.status(429).json({
      success: false,
      error: "Too many requests, please try again later.",
    });
  },
});

app.get("/health", limiter, (_req, res) => {
  res.status(200).json({ status: "Api-Gateway is UP" });
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
