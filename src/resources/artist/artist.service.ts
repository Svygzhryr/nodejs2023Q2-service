import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { IArtist, ICreateArtistDto, IUpdateArtistDto } from 'src/types';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  private _foundArtist = async (id: string) => {
    try {
      return await this.prisma.artists.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw Errors.internalServer;
    }
  };

  private _foundTrackByArtist = async (id: string) => {
    try {
      return await this.prisma.tracks.findFirst({
        where: {
          artistId: id,
        },
      });
    } catch (err) {
      console.log('ERRORR', err);
      throw Errors.internalServer;
    }
  };

  private _foundAlbumByArtist = async (id: string) => {
    try {
      return await this.prisma.albums.findFirst({
        where: {
          artistId: id,
        },
      });
    } catch (err) {
      console.log('ERRORR', err);
      throw Errors.internalServer;
    }
  };

  // private _foundArtistFavs = async (id: string) =>
  // {
  //   try {
  //     return await this.prisma.favs.findFirst({
  //       where: {
  //         artists
  //       },
  //     });
  //   } catch (err) {
  //     throw Errors.internalServer;
  //   }
  // };
  private _foundArtistFavs = async (id: string) =>
    database.favs.artists.find((artist) => artist.id === id);

  async findAll() {
    return await this.prisma.artists.findMany();
  }

  async findById(id: string) {
    const artist = await this._foundArtist(id);
    if (!artist) Errors.recordNotFound;
    return artist;
  }

  async create(createArtistDto: ICreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    console.log(artist);
    await this.prisma.artists.create({ data: artist });
    return artist;
  }

  async update(id: string, updateArtistDto: IUpdateArtistDto) {
    const { name, grammy } = updateArtistDto;
    let artist = await this._foundArtist(id);
    if (!artist) Errors.recordNotFound;
    artist = {
      id,
      name,
      grammy,
    };
    await this.prisma.artists.update({
      where: {
        id,
      },
      data: { ...artist },
    });
    return artist;
  }

  // нужно делать поля опциональными
  async delete(id: string) {
    const artist = await this._foundArtist(id);
    const artistInFav = await this._foundArtistFavs(id);

    let track = await this._foundTrackByArtist(id);
    let album = await this._foundAlbumByArtist(id);

    console.log(track, album);

    if (!artist) Errors.recordNotFound;
    await this.prisma.artists.delete({
      where: {
        id,
      },
    });

    if (track) {
      await this.prisma.tracks.delete({
        where: {
          id: track.id,
        },
        select: {
          artistId: null,
        },
      });
    }

    if (album) {
      await this.prisma.albums.delete({
        where: {
          id: album.id,
        },
        select: {
          artistId: null,
        },
      });
    }

    if (artistInFav) {
      database.favs.artists = database.favs.artists.filter(
        (artist) => artist.id !== id,
      );
    }
  }
}
