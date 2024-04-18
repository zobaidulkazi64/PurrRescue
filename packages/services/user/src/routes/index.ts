import express from "express";
const router = express.Router();
import { createUser } from "../controllers/";

router.post("/createUser", createUser);

export default router;
