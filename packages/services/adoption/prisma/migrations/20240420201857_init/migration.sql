-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PetCategory" AS ENUM ('DOG', 'CAT', 'BIRD');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EX_LARGE');

-- CreateEnum
CREATE TYPE "PetColor" AS ENUM ('WHITE', 'BLACK', 'BROWN', 'GRAY');

-- CreateEnum
CREATE TYPE "PetBreed" AS ENUM ('HUSKY', 'BEAGLE', 'DOGOT', 'LABRADO', 'POMERANIAN');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" "PetBreed" NOT NULL DEFAULT 'HUSKY',
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

-- CreateTable
CREATE TABLE "PetAdoption" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT,
    "size" "PetSize" NOT NULL DEFAULT 'MEDIUM',
    "color" "PetColor" NOT NULL DEFAULT 'BLACK',
    "breed" "PetBreed" NOT NULL DEFAULT 'HUSKY',
    "age" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "category" "PetCategory" NOT NULL DEFAULT 'DOG',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetAdoption_pkey" PRIMARY KEY ("id")
);
