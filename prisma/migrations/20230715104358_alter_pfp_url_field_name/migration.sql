/*
  Warnings:

  - You are about to drop the column `pfpUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pfpUrl",
ADD COLUMN     "profilePicture" TEXT;
