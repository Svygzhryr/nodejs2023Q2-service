-- CreateTable
CREATE TABLE "Albums" (
    "id" UUID NOT NULL,
    "name" CHAR(1) NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" UUID,

    CONSTRAINT "Albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artists" (
    "id" UUID NOT NULL,
    "name" CHAR(1) NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favs" (
    "artists" UUID,
    "albums" UUID,
    "tracks" UUID,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Favs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracks" (
    "id" UUID NOT NULL,
    "name" CHAR(1) NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" UUID,
    "albumId" UUID,

    CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "login" CHAR(1) NOT NULL,
    "password" CHAR(1) NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Favs" ADD CONSTRAINT "album_fkey" FOREIGN KEY ("albums") REFERENCES "Albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Favs" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artists") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Favs" ADD CONSTRAINT "tracks_fkey" FOREIGN KEY ("tracks") REFERENCES "Tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "album_fkey" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
