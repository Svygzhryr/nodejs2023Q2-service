import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { ICreateTrackDto, IUpdateTrackDto } from 'src/types';
import { Errors } from 'src/errors';

@Injectable()
export class TrackService {
  private _foundTrack = (id: string) =>
    database.track.find((track) => track.id === id);

  findAll() {
    return database.track;
  }

  findById(id: string) {
    const track = this._foundTrack(id);
    if (!track) Errors.recordNotFound;
    return track;
  }

  create(createTrackDto: ICreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    const track = {
      id: uuidv4(),
      name: name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    };
    database.track.push(track);
    return track;
  }

  update(id: string, updateTrackDto: IUpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;
    const track = this._foundTrack(id);
    if (!track) Errors.recordNotFound;
    try {
      track.name = name;
      track.artistId = artistId;
      track.albumId = albumId;
      track.duration = duration;
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return track;
  }

  delete(id: string) {
    const track = this._foundTrack(id);
    if (!track) Errors.recordNotFound;
    database.track = database.track.filter((item) => item.id !== id);
  }
}
