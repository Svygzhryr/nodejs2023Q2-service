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
import { IAlbum, ICreateAlbumDto, IUpdateAlbumDto } from 'src/types';
import { validate } from 'uuid';
import { AlbumService } from './album.service';
import { Errors } from 'src/errors';
import { HttpExceptionFilter } from 'src/exception.filter';

@Controller('album')
@UseFilters(new HttpExceptionFilter())
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAllAlbums(): Promise<IAlbum[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  getOneAlbum(@Param() { id }: { id: string }): Promise<IAlbum> {
    if (!validate(id)) Errors.invalidId;
    return this.albumService.findById(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: ICreateAlbumDto) {
    const { name, year } = createAlbumDto;
    if (!name || !year) Errors.invalidBody;
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param() { id }: { id: string },
    @Body() updateAlbumDto: IUpdateAlbumDto,
  ) {
    const { name, year } = updateAlbumDto;
    if (!name || typeof year !== 'number' || year < 1900) Errors.invalidBody;
    if (!validate(id)) Errors.invalidId;
    return this.albumService.update(id, updateAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAlbum(@Param() { id }: { id: string }) {
    if (!validate(id)) Errors.invalidId;
    return this.albumService.delete(id);
  }
}
