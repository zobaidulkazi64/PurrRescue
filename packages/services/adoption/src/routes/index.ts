import express from "express";
const router = express.Router();

import { createPet, getPetById, petAdoption } from "@/controllers";

router.post("/pets", createPet);
router.get("/pets/:id", getPetById);

// adoption
router.post("/pets/adoption", petAdoption);

export default router;
