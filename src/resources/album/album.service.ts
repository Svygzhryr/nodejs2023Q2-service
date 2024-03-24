import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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
          albumId: id,
        },
      });
    } catch (err) {
      throw Errors.internalServer;
    }
  };

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
      artistId: artistId || null,
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
      album.artistId = artistId || null;
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
    if (!album) Errors.recordNotFound;

    if (track) {
      await this.prisma.tracks.update({
        where: {
          id: track.id,
        },
        data: { ...track, albumId: null },
      });
    }

    await this.prisma.albums.delete({
      where: {
        id,
      },
    });

    // if (albumInFavs) {
    //   await this.prisma.favs.deleteMany({
    //     where: {
    //       albums: album.id,
    //     },
    //   });
    // }
  }
}
