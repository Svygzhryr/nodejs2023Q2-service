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
import { ICreateTrackDto, ITrack, IUpdateTrackDto } from 'src/types';
import { TrackService } from './track.service';
import { validate } from 'uuid';
import { Errors } from 'src/errors';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllTracks(): ITrack[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  getOneTrack(@Param() { id }: { id: string }): ITrack {
    if (!validate(id)) Errors.invalidId;
    return this.trackService.findById(id);
  }

  @Post()
  createTrack(@Body() createTrackDto: ICreateTrackDto) {
    const { duration, name } = createTrackDto;
    if (!duration || !name) Errors.invalidBody;
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  updateTrack(
    @Param() { id }: { id: string },
    @Body() updateTrackDto: IUpdateTrackDto,
  ) {
    const { name, duration } = updateTrackDto;
    if (!duration || !name) Errors.invalidBody;
    if (!validate(id)) Errors.invalidId;
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteDrack(@Param() { id }: { id: string }) {
    if (!validate(id)) Errors.invalidId;
    return this.trackService.delete(id);
  }
}
