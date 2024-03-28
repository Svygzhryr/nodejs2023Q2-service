import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { IAlbum, IArtist, IFavorites, IFavs, ITrack } from 'src/types';
import { validate } from 'uuid';
import { Errors } from 'src/errors';
import { HttpExceptionFilter } from 'src/exception.filter';

@Controller('favs')
@UseFilters(new HttpExceptionFilter())
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getAllFavs(): Promise<IFavs> {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param() { id }: { id: string }): Promise<ITrack> {
    if (!validate(id)) Errors.invalidId;
    return this.favsService.addTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  removeTrackFromFavs(@Param() { id }: { id: string }): Promise<void> {
    if (!validate(id)) Errors.invalidId;
    return this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param() { id }: { id: string }): Promise<IAlbum> {
    if (!validate(id)) Errors.invalidId;
    return this.favsService.addAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeAlbumFromFavs(@Param() { id }: { id: string }): Promise<void> {
    if (!validate(id)) Errors.invalidId;
    return this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param() { id }: { id: string }): Promise<IArtist> {
    if (!validate(id)) Errors.invalidId;
    return this.favsService.addArtist(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeArtistFromFavs(@Param() { id }: { id: string }): Promise<void> {
    if (!validate(id)) Errors.invalidId;
    return this.favsService.removeArtist(id);
  }
}
