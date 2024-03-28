import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { IArtist, ICreateArtistDto, IUpdateArtistDto } from 'src/types';
import { validate } from 'uuid';
import { ArtistService } from './artist.service';
import { Errors } from 'src/errors';
import { HttpExceptionFilter } from 'src/exception.filter';

@Controller('artist')
@UseFilters(new HttpExceptionFilter())
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(): Promise<IArtist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  getOneArtist(@Param() { id }: { id: string }): Promise<IArtist> {
    if (!validate(id)) Errors.invalidId;
    return this.artistService.findById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: ICreateArtistDto): Promise<IArtist> {
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArtist(@Param() { id }: { id: string }) {
    if (!validate(id)) Errors.invalidId;
    return this.artistService.delete(id);
  }
}
