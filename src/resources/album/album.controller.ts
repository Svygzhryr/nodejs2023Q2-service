import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IAlbum, ICreateAlbumDto, IUpdateAlbumDto } from 'src/types';
import { validate } from 'uuid';
import { AlbumErrors } from './album.errors';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAllAlbums(): IAlbum[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  getOneAlbum(@Param() { id }: { id: string }): IAlbum {
    if (!validate(id)) AlbumErrors.invalidId;
    return this.albumService.findById(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: ICreateAlbumDto) {
    const { name, year } = createAlbumDto;
    if (!name || !year) AlbumErrors.invalidBody;
    return this.albumService.create(createAlbumDto);
  }

  @Put()
  updateAlbum(
    @Param() { id }: { id: string },
    @Body() updateAlbumDto: IUpdateAlbumDto,
  ) {
    if (!validate(id)) AlbumErrors.invalidId;
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete()
  deleteAlbum(@Param() { id }: { id: string }) {
    if (!validate(id)) AlbumErrors.invalidId;
    return this.albumService.delete(id);
  }
}
