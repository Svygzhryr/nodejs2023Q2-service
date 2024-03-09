import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IArtist, ICreateArtistDto, IUpdateArtistDto } from 'src/types';
import { validate } from 'uuid';
import { ArtistService } from './artist.service';
import { Errors } from 'src/errors';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(): IArtist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  getOneArtist(@Param() { id }: { id: string }): IArtist {
    if (!validate(id)) Errors.invalidId;
    return this.artistService.findById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: ICreateArtistDto): IArtist {
    const { name, grammy } = createArtistDto;
    if (!name || grammy === undefined) Errors.invalidBody;
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param() { id }: { id: string },
    @Body() updateArtistDto: IUpdateArtistDto,
  ) {
    const { name, grammy } = updateArtistDto;
    if (!name || typeof grammy !== 'boolean') Errors.invalidBody;
    if (!validate(id)) Errors.invalidId;
    return this.artistService.update(id, updateArtistDto);
  }

  // удаление здесь также должно затрагивать связанные треки и альбомы
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param() { id }: { id: string }) {
    if (!validate(id)) Errors.invalidId;
    return this.artistService.delete(id);
  }
}
