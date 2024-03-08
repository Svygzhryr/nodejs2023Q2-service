import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IArtist, ICreateArtistDto, IUpdateArtistDto } from 'src/types';
import { validate } from 'uuid';
import { ArtistErrors } from './artist.errors';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(): IArtist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  getOneArtist(@Param() { id }: { id: string }): IArtist {
    if (!validate(id)) ArtistErrors.invalidId;
    return this.artistService.findById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: ICreateArtistDto) {
    const { name, grammy } = createArtistDto;
    if (!name || !grammy) ArtistErrors.invalidBody;
    return this.artistService.create(createArtistDto);
  }

  @Put()
  updateArtist(
    @Param() { id }: { id: string },
    @Body() updaetArtistDto: IUpdateArtistDto,
  ) {
    if (!validate(id)) ArtistErrors.invalidId;
    return this.artistService.update(id, updaetArtistDto);
  }

  @Delete()
  deleteArtist(@Param() { id }: { id: string }) {
    if (!validate(id)) ArtistErrors.invalidId;
    return this.artistService.delete(id);
  }
}
