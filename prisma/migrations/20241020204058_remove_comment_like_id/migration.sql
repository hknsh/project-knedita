/*
  Warnings:

  - The primary key for the `CommentLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CommentLike` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("commentId", "userId");
