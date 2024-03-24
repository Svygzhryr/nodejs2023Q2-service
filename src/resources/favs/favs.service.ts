import { Injectable } from '@nestjs/common';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  private _favsCheck = async () => {
    try {
      const areFavsThere = await this.prisma.favs.findFirst({
        where: {
          id: 'favorite',
        },
      });
      if (!areFavsThere) {
        await this.prisma.favs.create({
          data: {},
        });
      }
    } catch (err) {}
  };

  private _foundTrack = async (id: string) => {
    try {
      return await this.prisma.tracks.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {}
  };

  private _foundArtist = async (id: string) =>
    await this.prisma.artists.findUnique({
      where: {
        id,
      },
    });

  private _foundAlbum = async (id: string) =>
    await this.prisma.albums.findUnique({
      where: {
        id,
      },
    });

  async findAll() {
    await this._favsCheck();
    const favs = await this.prisma.favs.findFirst({
      select: {
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
      },
    });

    return favs;
  }

  async addTrack(id: string) {
    await this._favsCheck();
    const track = await this._foundTrack(id);
    if (!track) Errors.unprocessableEntity;

    await this.prisma.tracks.update({
      where: {
        id,
      },
      data: {
        favorite: 'favorite',
      },
    });

    return track;
  }

  async removeTrack(id: string) {
    const track = await this._foundTrack(id);
    if (!track) Errors.recordNotFound;
    await this.prisma.tracks.update({
      where: {
        id,
      },
      data: {
        favorite: null,
      },
    });
  }

  async addAlbum(id: string) {
    await this._favsCheck();
    const album = await this._foundAlbum(id);

    if (!album) Errors.unprocessableEntity;

    await this.prisma.albums.update({
      where: {
        id,
      },
      data: {
        favorite: 'favorite',
      },
    });

    return album;
  }

  async removeAlbum(id: string) {
    await this._favsCheck();
    const album = await this._foundAlbum(id);
    if (!album) Errors.recordNotFound;
    await this.prisma.albums.update({
      where: {
        id,
      },
      data: {
        favorite: null,
      },
    });
  }

  async addArtist(id: string) {
    await this._favsCheck();
    const artist = await this._foundArtist(id);
    if (!artist) Errors.unprocessableEntity;
    await this.prisma.artists.update({
      where: {
        id,
      },
      data: {
        favorite: 'favorite',
      },
    });

    return artist;
  }

  async removeArtist(id: string) {
    await this._favsCheck();
    const artist = await this._foundArtist(id);
    if (!artist) Errors.recordNotFound;
    await this.prisma.artists.update({
      where: {
        id,
      },
      data: {
        favorite: null,
      },
    });
  }
}
