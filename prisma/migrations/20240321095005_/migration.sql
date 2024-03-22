-- CreateTable
CREATE TABLE "Albums" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" UUID,
    "favorite" VARCHAR,

    CONSTRAINT "Albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artists" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "grammy" BOOLEAN NOT NULL,
    "favorite" VARCHAR,

    CONSTRAINT "Artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favs" (
    "id" VARCHAR NOT NULL DEFAULT '1',

    CONSTRAINT "Favs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracks" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" UUID,
    "albumId" UUID,
    "favorite" VARCHAR,

    CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "login" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "updatedAt" BIGINT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "albums" FOREIGN KEY ("favorite") REFERENCES "Favs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Artists" ADD CONSTRAINT "artists" FOREIGN KEY ("favorite") REFERENCES "Favs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "album_fkey" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "artist_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "tracks" FOREIGN KEY ("favorite") REFERENCES "Favs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
