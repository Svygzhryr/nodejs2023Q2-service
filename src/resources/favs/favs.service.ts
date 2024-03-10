import { Injectable } from '@nestjs/common';
import { database } from 'src/database';
import { Errors } from 'src/errors';

@Injectable()
export class FavsService {
  private _foundTrack = (id: string) =>
    database.track.find((track) => track.id === id);

  private _foundFavTrack = (id: string) =>
    database.favs.tracks.find((track) => track.id === id);

  private _foundArtist = (id: string) =>
    database.artist.find((artist) => artist.id === id);

  private _foundFavArtist = (id: string) =>
    database.favs.artists.find((track) => track.id === id);

  private _foundAlbum = (id: string) =>
    database.album.find((album) => album.id === id);

  private _foundFavAlbum = (id: string) =>
    database.favs.albums.find((track) => track.id === id);

  findAll() {
    return database.favs;
  }

  addTrack(id: string) {
    const track = this._foundTrack(id);
    if (!track) Errors.unprocessableEntity;
    database.favs.tracks.push(track);
  }

  removeTrack(id: string) {
    const track = this._foundFavTrack(id);
    if (!track) Errors.recordNotFound;
    database.favs.tracks = database.favs.tracks.filter(
      (item) => item.id !== id,
    );
  }

  addAlbum(id: string) {
    const album = this._foundAlbum(id);
    if (!album) Errors.unprocessableEntity;
    database.favs.albums.push(album);
  }

  removeAlbum(id: string) {
    const album = this._foundFavAlbum(id);
    if (!album) Errors.recordNotFound;
    database.favs.albums = database.favs.albums.filter(
      (item) => item.id !== id,
    );
  }

  addArtist(id: string) {
    const artist = this._foundArtist(id);
    if (!artist) Errors.unprocessableEntity;
    database.favs.artists.push(artist);
  }

  removeArtist(id: string) {
    const artist = this._foundFavArtist(id);
    if (!artist) Errors.recordNotFound;
    database.favs.artists = database.favs.artists.filter(
      (item) => item.id !== id,
    );
  }
}
