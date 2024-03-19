/*
  Warnings:

  - You are about to drop the column `artistId` on the `Albums` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Albums" DROP CONSTRAINT "artistId";

-- AlterTable
ALTER TABLE "Albums" DROP COLUMN "artistId",
ADD COLUMN     "artistId" UUID;

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
