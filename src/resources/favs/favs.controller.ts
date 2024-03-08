import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { database } from 'src/database';
import { IFavs } from 'src/types';
import { validate } from 'uuid';
import { TrackErrors } from '../track/track.errors';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getAllFavs(): IFavs {
    return this.favsService.findAll();
  }

  @Post(':id')
  addTrackToFavs(@Param() { id }: { id: string }): void {
    if (!validate(id)) TrackErrors.invalidId;
    this.favsService.addTrack(id);
  }

  @Delete(':id')
  removeTrackFromFavs(@Param() { id }: { id: string }): void {
    if (!validate(id)) TrackErrors.invalidId;
    this.favsService.removeTrack(id);
  }
}
