/*
  Warnings:

  - You are about to drop the column `artist_id` on the `Albums` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Albums" DROP CONSTRAINT "artist_id";

-- AlterTable
ALTER TABLE "Albums" DROP COLUMN "artist_id",
ADD COLUMN     "artist_id" UUID;

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
