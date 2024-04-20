import express from "express";
const router = express.Router();

import { createPet } from "@/controllers";

router.post("/pets", createPet);

export default router;
