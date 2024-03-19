import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { ICreateTrackDto, IUpdateTrackDto } from 'src/types';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  private _foundTrack = async (id: string) => {
    try {
      return await this.prisma.tracks.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw Errors.internalServer;
    }
  };

  private _foundTrackFavs = (id: string) =>
    database.favs.tracks.find((track) => track.id === id);

  async findAll() {
    return await this.prisma.tracks.findMany();
  }

  async findById(id: string) {
    const track = await this._foundTrack(id);
    if (!track) Errors.recordNotFound;
    return track;
  }

  async create(createTrackDto: ICreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    const track = {
      id: uuidv4(),
      name: name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    };
    await this.prisma.tracks.create({ data: { ...track } });
    return track;
  }

  async update(id: string, updateTrackDto: IUpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;
    const track = await this._foundTrack(id);
    if (!track) Errors.recordNotFound;
    try {
      track.name = name;
      track.artist_id = artistId;
      track.album_id = albumId;
      track.duration = duration;
    } catch (err) {
      throw new InternalServerErrorException();
    }
    await this.prisma.tracks.update({
      where: {
        id,
      },
      data: { ...track },
    });
    return track;
  }

  async delete(id: string) {
    const track = await this._foundTrack(id);
    const trackInFav = this._foundTrackFavs(id);
    if (!track) Errors.recordNotFound;
    await this.prisma.tracks.delete({
      where: {
        id,
      },
    });

    if (trackInFav) {
      database.favs.tracks = database.favs.tracks.filter(
        (track) => track.id !== id,
      );
    }
  }
}
