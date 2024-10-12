-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "kweekId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
