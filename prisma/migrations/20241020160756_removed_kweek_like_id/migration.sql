/*
  Warnings:

  - The primary key for the `KweekLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `KweekLike` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KweekLike" DROP CONSTRAINT "KweekLike_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "KweekLike_pkey" PRIMARY KEY ("kweekId", "userId");
