import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";
import { CreatePetSchema } from "@/utils/schemas";