/*
  Warnings:

  - You are about to drop the column `postId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLike` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kweekId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "postId",
ADD COLUMN     "kweekId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostLike";

-- CreateTable
CREATE TABLE "Kweek" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kweek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KweekLike" (
    "id" TEXT NOT NULL,
    "kweekId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KweekLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kweek" ADD CONSTRAINT "Kweek_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KweekLike" ADD CONSTRAINT "KweekLike_kweekId_fkey" FOREIGN KEY ("kweekId") REFERENCES "Kweek"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KweekLike" ADD CONSTRAINT "KweekLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_kweekId_fkey" FOREIGN KEY ("kweekId") REFERENCES "Kweek"("id") ON DELETE CASCADE ON UPDATE CASCADE;
