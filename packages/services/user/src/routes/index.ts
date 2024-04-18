import express from "express";
const router = express.Router();
import { createUser, getUserById } from "../controllers/";

router.post("/createUser", createUser);
router.get("/users/:id", getUserById);

export default router;
