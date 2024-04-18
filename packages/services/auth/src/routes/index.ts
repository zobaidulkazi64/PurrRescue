import express from "express";
const router = express.Router();
import { UserRegistration, UserLogin, authToken } from "@/controllers";

router.post("/registration", UserRegistration);
router.post("/login", UserLogin);
router.post("/auth-token", authToken);

export default router;
