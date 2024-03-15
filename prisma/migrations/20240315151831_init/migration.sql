/*
  Warnings:

  - You are about to drop the column `id_artist` on the `Albums` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Albums" DROP CONSTRAINT "artist_fkey";

-- AlterTable
ALTER TABLE "Albums" DROP COLUMN "id_artist",
ADD COLUMN     "artist_id" UUID,
ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Artists" ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Tracks" ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "login" SET DATA TYPE VARCHAR,
ALTER COLUMN "password" SET DATA TYPE VARCHAR,
ALTER COLUMN "createdAt" SET DATA TYPE BIGINT,
ALTER COLUMN "updatedAt" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "artist_id" FOREIGN KEY ("artist_id") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
