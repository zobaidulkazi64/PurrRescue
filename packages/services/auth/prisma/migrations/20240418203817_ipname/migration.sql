/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `LoginHistory` table. All the data in the column will be lost.
  - You are about to drop the column `loginAt` on the `LoginHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LoginHistory" DROP COLUMN "ipAddress",
DROP COLUMN "loginAt",
ADD COLUMN     "ip" TEXT;
