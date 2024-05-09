import express from "express";
const router = express.Router();
import { createUser, getUserById, getAllUsers } from "../controllers/";

router.get("/users", getAllUsers);
router.post("/createUser", createUser);
router.get("/users/:id", getUserById);

export default router;
