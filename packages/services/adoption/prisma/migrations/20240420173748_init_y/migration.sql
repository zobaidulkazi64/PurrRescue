-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PetCategory" AS ENUM ('DOG', 'CAT', 'BIRD');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EX_LARGE');

-- CreateEnum
CREATE TYPE "PetColor" AS ENUM ('WHITE', 'BLACK', 'BROWN', 'GRAY');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "color" "PetColor" NOT NULL DEFAULT 'BLACK',
    "size" "PetSize" NOT NULL DEFAULT 'MEDIUM',
    "description" TEXT NOT NULL,
    "image" TEXT,
    "category" "PetCategory" NOT NULL DEFAULT 'DOG',
    "gender" "PetGender" NOT NULL DEFAULT 'MALE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);
