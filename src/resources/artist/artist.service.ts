import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { ICreateArtistDto, IUpdateArtistDto } from 'src/types';
import { Errors } from 'src/errors';

@Injectable()
export class ArtistService {
  private _foundArtist = (id: string) =>
    database.artist.find((artist) => artist.id === id);

  findAll() {
    return database.artist;
  }

  findById(id: string) {
    const artist = this._foundArtist(id);
    if (!artist) Errors.recordNotFound;
    return artist;
  }

  create(createArtistDto: ICreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    database.artist.push(artist);
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
    console.log(artist);
    if (!artist) Errors.recordNotFound;
    database.artist = database.artist.filter((item) => item.id !== id);
  }
}
