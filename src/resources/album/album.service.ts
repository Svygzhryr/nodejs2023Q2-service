import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { AlbumErrors } from './album.errors';
import { ICreateAlbumDto, IUpdateAlbumDto } from 'src/types';

@Injectable()
export class AlbumService {
  private _foundAlbum = (id: string) =>
    database.album.find((album) => album.id === id);

  findAll() {
    return database.album;
  }

  findById(id: string) {
    const album = this._foundAlbum(id);
    if (!album) AlbumErrors.albumNotFound;
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
    if (!album) AlbumErrors.albumNotFound;
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
    if (!album) AlbumErrors.albumNotFound;
    database.album = database.album.filter((item) => item.id !== id);
  }
}
