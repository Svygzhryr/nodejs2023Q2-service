import { Injectable } from '@nestjs/common';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  private _foundTrack = async (id: string) => {
    try {
      return await this.prisma.tracks.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw Errors.internalServer;
    }
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

  // посмотреть что возвращалось раньше ( с локальной дб)
  // и что возвращается сейчас
  async findAll() {
    return await this.prisma.favs.findMany();
  }

  async addTrack(id: string) {
    const track = await this._foundTrack(id);
    if (!track) Errors.unprocessableEntity;
    await this.prisma.favs.create({
      data: {
        tracks: track.id,
      },
    });
  }

  async removeTrack(id: string) {
    const track = await this._foundTrack(id);
    if (!track) Errors.recordNotFound;
    await this.prisma.favs.deleteMany({
      where: {
        tracks: track.id,
      },
    });
  }

  async addAlbum(id: string) {
    const album = await this._foundAlbum(id);
    if (!album) Errors.unprocessableEntity;
    await this.prisma.favs.create({
      data: {
        albums: album.id,
      },
    });
  }

  async removeAlbum(id: string) {
    const album = await this._foundAlbum(id);
    if (!album) Errors.recordNotFound;
    await this.prisma.favs.deleteMany({
      where: {
        albums: album.id,
      },
    });
  }

  async addArtist(id: string) {
    const artist = await this._foundArtist(id);
    if (!artist) Errors.unprocessableEntity;
    await this.prisma.favs.create({
      data: {
        artists: artist.id,
      },
    });
  }

  async removeArtist(id: string) {
    const artist = await this._foundArtist(id);
    if (!artist) Errors.recordNotFound;
    await this.prisma.favs.deleteMany({
      where: {
        artists: artist.id,
      },
    });
  }
}
