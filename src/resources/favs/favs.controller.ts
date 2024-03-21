import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { IFavs } from 'src/types';
import { validate } from 'uuid';
import { Errors } from 'src/errors';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getAllFavs(): Promise<IFavs[]> {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param() { id }: { id: string }): void {
    if (!validate(id)) Errors.invalidId;
    this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavs(@Param() { id }: { id: string }): void {
    if (!validate(id)) Errors.invalidId;
    this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param() { id }: { id: string }): void {
    if (!validate(id)) Errors.invalidId;
    this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavs(@Param() { id }: { id: string }): void {
    if (!validate(id)) Errors.invalidId;
    this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param() { id }: { id: string }): void {
    if (!validate(id)) Errors.invalidId;
    this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavs(@Param() { id }: { id: string }): void {
    if (!validate(id)) Errors.invalidId;
    this.favsService.removeArtist(id);
  }
}
