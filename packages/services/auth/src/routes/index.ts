import express from "express";
const router = express.Router();
import { UserRegistration, UserLogin } from "@/controllers";

router.post("/registration", UserRegistration);
router.post("/login", UserLogin);

export default router;
