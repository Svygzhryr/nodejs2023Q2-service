-- DropForeignKey
ALTER TABLE "Albums" DROP CONSTRAINT "albums";

-- DropForeignKey
ALTER TABLE "Albums" DROP CONSTRAINT "artist_fkey";

-- DropForeignKey
ALTER TABLE "Artists" DROP CONSTRAINT "artists";

-- DropForeignKey
ALTER TABLE "Tracks" DROP CONSTRAINT "album_fkey";

-- DropForeignKey
ALTER TABLE "Tracks" DROP CONSTRAINT "artist_fkey";

-- DropForeignKey
ALTER TABLE "Tracks" DROP CONSTRAINT "tracks";

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "albums" FOREIGN KEY ("favorite") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Artists" ADD CONSTRAINT "artists" FOREIGN KEY ("favorite") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "album_fkey" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "tracks" FOREIGN KEY ("favorite") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE SET NULL;
