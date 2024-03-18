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
      return (await this.prisma.artists.findUnique({
        where: {
          id,
        },
      })) as unknown as IArtist;
    } catch (err) {
      console.log(err);
      throw Errors.internalServer;
    }
  };

  private _foundTrackByArtist = async (id: string) => {
    try {
      return await this.prisma.tracks.findFirst({
        where: {
          artist_id: id,
        },
      });
    } catch (err) {
      throw Errors.internalServer;
    }
  };

  private _foundAlbumByArtist = async (id: string) => {
    try {
      return await this.prisma.albums.findFirst({
        where: {
          id_artist: id,
        },
      });
    } catch (err) {
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
    const artist = await this._foundArtist(id);
    if (!artist) Errors.recordNotFound;
    try {
      artist.name = name;
      artist.grammy = grammy;
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return artist;
  }

  async delete(id: string) {
    const artist = await this._foundArtist(id);
    const artistInFav = await this._foundArtistFavs(id);
    const track = await this._foundTrackByArtist(id);
    const album = await this._foundAlbumByArtist(id);

    if (!artist) Errors.recordNotFound;
    this.prisma.artists.delete({
      where: {
        id,
      },
    });

    if (track) {
      track.artist_id = null;
    }

    if (album) {
      album.id_artist = null;
    }

    if (artistInFav) {
      database.favs.artists = database.favs.artists.filter(
        (artist) => artist.id !== id,
      );
    }
  }
}
