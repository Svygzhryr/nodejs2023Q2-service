import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { ICreateAlbumDto, IUpdateAlbumDto } from 'src/types';
import { Errors } from 'src/errors';

@Injectable()
export class AlbumService {
  private _foundAlbum = (id: string) =>
    database.album.find((album) => album.id === id);

  findAll() {
    return database.album;
  }

  findById(id: string) {
    const album = this._foundAlbum(id);
    if (!album) Errors.recordNotFound;
    return album;
  }

  create(createAlbumDto: ICreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    const album = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    };
    database.album.push(album);
    return album;
  }

  update(id: string, updateAlbumDto: IUpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;
    const album = this._foundAlbum(id);
    if (!album) Errors.recordNotFound;
    try {
      album.name = name;
      album.year = year;
      album.artistId = artistId;
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return album;
  }

  delete(id: string) {
    const album = this._foundAlbum(id);
    if (!album) Errors.recordNotFound;
    database.album = database.album.filter((item) => item.id !== id);
  }
}
