import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { ICreateAlbumDto, IUpdateAlbumDto } from 'src/types';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  private _foundAlbum = async (id: string) => {
    try {
      return await this.prisma.albums.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw Errors.internalServer;
    }
  };

  private _foundTrackByAlbum = async (id: string) => {
    try {
      return await this.prisma.tracks.findFirst({
        where: {
          album_id: id,
        },
      });
    } catch (err) {
      throw Errors.internalServer;
    }
  };

  private _foundAlbumFavs = (id: string) =>
    database.favs.albums.find((album) => album.id === id);

  async findAll() {
    return await this.prisma.albums.findMany();
  }

  async findById(id: string) {
    const album = await this._foundAlbum(id);
    if (!album) Errors.recordNotFound;
    return album;
  }

  async create(createAlbumDto: ICreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    const album = {
      id: uuidv4(),
      name,
      year,
      artist_id: artistId || null,
    };
    await this.prisma.albums.create({
      data: { ...album },
    });
    return album;
  }

  async update(id: string, updateAlbumDto: IUpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;
    const album = await this._foundAlbum(id);
    if (!album) Errors.recordNotFound;
    try {
      album.name = name;
      album.year = year;
      album.artist_id = artistId;
    } catch (err) {
      throw new InternalServerErrorException();
    }
    await this.prisma.albums.update({
      where: {
        id,
      },
      data: { ...album },
    });
    return album;
  }

  async delete(id: string) {
    const album = await this._foundAlbum(id);
    const track = await this._foundTrackByAlbum(id);
    const albumInFavs = this._foundAlbumFavs(id);
    if (!album) Errors.recordNotFound;
    await this.prisma.albums.delete({
      where: {
        id,
      },
    });

    if (track) {
      await this.prisma.tracks.update({
        where: {
          id: track.id,
        },
        data: { ...track },
      });
    }

    if (albumInFavs) {
      database.favs.albums = database.favs.albums.filter(
        (album) => album.id !== id,
      );
    }
  }
}
