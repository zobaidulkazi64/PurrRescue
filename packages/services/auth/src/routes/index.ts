import express from "express";
const router = express.Router();
import { UserRegister, UserLogin, authToken } from "@/controllers";

router.post("/registration", UserRegister);
router.post("/login", authToken, UserLogin);
router.post("/auth-token", authToken);

export default router;
