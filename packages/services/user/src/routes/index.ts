import express from "express";
const router = express.Router();
import { createUser, getUserById, getAllUsers } from "../controllers/";

router.get("/users", getAllUsers);
router.post("/create", createUser);
router.get("/users/:id", getUserById);

export default router;
