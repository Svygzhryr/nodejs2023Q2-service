import { Injectable } from '@nestjs/common';
import { database } from 'src/database';
import { TrackErrors } from '../track/track.errors';

@Injectable()
export class FavsService {
  private _foundTrack = (id: string) =>
    database.track.find((track) => track.id === id);

  private _foundFavTrack = (id: string) =>
    database.favs.tracks.find((track) => track.id === id);

  private _foundArtist = (id: string) =>
    database.track.find((artist) => artist.id === id);

  private _foundAlbum = (id: string) =>
    database.track.find((album) => album.id === id);

  findAll() {
    return database.favs;
  }

  addTrack(id: string) {
    const track = this._foundTrack(id);
    if (!track) TrackErrors.trackNotFound;
    database.favs.tracks.push(track);
  }

  removeTrack(id: string) {
    const track = this._foundFavTrack(id);
    if (!track) TrackErrors.trackNotFound;
    database.favs.tracks = database.favs.tracks.filter(
      (item) => item.id !== id,
    );
  }
}
