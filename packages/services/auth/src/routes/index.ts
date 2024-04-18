import express from "express";
const router = express.Router();
import { UserRegistration } from "@/controllers";

router.post("/registration", UserRegistration);

export default router;
