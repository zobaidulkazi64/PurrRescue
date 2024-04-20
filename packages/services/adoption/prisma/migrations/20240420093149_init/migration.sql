-- CreateEnum
CREATE TYPE "petGender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "petCategory" AS ENUM ('DOG', 'CAT', 'BIRD');

-- CreateEnum
CREATE TYPE "petSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EX_LARGE');

-- CreateEnum
CREATE TYPE "petColor" AS ENUM ('WHITH', 'BLACK', 'BROWN', 'GRAY');

-- CreateEnum
CREATE TYPE "petBreed" AS ENUM ('LABRADOR', 'POODLE', 'BEAGLE', 'GERMAN_SHEPHERD', 'GOLDEN_RETRIEVER', 'DACHSHUND', 'BULLDOG', 'HUSKY');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "color" "petColor" NOT NULL DEFAULT 'BLACK',
    "size" "petSize" NOT NULL DEFAULT 'MEDIUM',
    "description" TEXT NOT NULL,
    "images" TEXT,
    "category" "petCategory" NOT NULL DEFAULT 'DOG',
    "gender" "petGender" NOT NULL DEFAULT 'FEMALE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetAdoption" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "size" "petSize" NOT NULL DEFAULT 'MEDIUM',
    "color" "petColor" NOT NULL DEFAULT 'BLACK',
    "breed" "petBreed" NOT NULL DEFAULT 'HUSKY',
    "age" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetAdoption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pet_breed_key" ON "Pet"("breed");
