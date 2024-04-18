/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'Gazipur, Dhaka',
ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Dhaka',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Bangladesh',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "postalCode" TEXT NOT NULL DEFAULT '1000',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Dhaka';
