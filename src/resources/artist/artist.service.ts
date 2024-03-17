import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { ICreateArtistDto, IUpdateArtistDto } from 'src/types';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  private _foundArtist = (id: string) =>
    database.artist.find((artist) => artist.id === id);

  private _foundTrackByArtist = (id: string) =>
    database.track.find((track) => track.artistId === id);

  private _foundAlbumByArtist = (id: string) =>
    database.album.find((album) => album.artistId === id);

  private _foundArtistFavs = (id: string) =>
    database.favs.artists.find((artist) => artist.id === id);

  async findAll() {
    return await this.prisma.artists.findMany();
  }

  findById(id: string) {
    const artist = this._foundArtist(id);
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
    // database.artist.push(artist);
    await this.prisma.artists.create({ data: artist });
    return artist;
  }

  update(id: string, updateArtistDto: IUpdateArtistDto) {
    const { name, grammy } = updateArtistDto;
    const artist = this._foundArtist(id);
    if (!artist) Errors.recordNotFound;
    try {
      artist.name = name;
      artist.grammy = grammy;
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return artist;
  }

  delete(id: string) {
    const artist = this._foundArtist(id);
    const artistInFav = this._foundArtistFavs(id);
    const track = this._foundTrackByArtist(id);
    const album = this._foundAlbumByArtist(id);

    if (!artist) Errors.recordNotFound;
    database.artist = database.artist.filter((item) => item.id !== id);

    if (track) {
      track.artistId = null;
    }

    if (album) {
      album.artistId = null;
    }

    if (artistInFav) {
      database.favs.artists = database.favs.artists.filter(
        (artist) => artist.id !== id,
      );
    }
  }
}
