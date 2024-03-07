import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ICreateTrackDto, ITrack, IUpdateTrackDto } from 'src/types';
import { TrackService } from './track.service';
import { validate } from 'uuid';
import { TrackErrors } from './track.errors';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllTracks(): ITrack[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  getOneTrack(@Param() { id }: { id: string }): ITrack {
    if (!validate(id)) TrackErrors.invalidId;
    return this.trackService.findById(id);
  }

  @Post()
  createTrack(@Body() createTrackDto: ICreateTrackDto) {
    const { duration, name } = createTrackDto;
    if (!duration || !name) TrackErrors.invalidBody;
    return this.trackService.create(createTrackDto);
  }

  @Put()
  updateTrack(
    @Param() { id }: { id: string },
    @Body() updateTrackDto: IUpdateTrackDto,
  ) {
    if (!validate(id)) TrackErrors.invalidId;
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete()
  deleteDrack(@Param() { id }: { id: string }) {
    if (!validate(id)) TrackErrors.invalidId;
    return this.trackService.delete(id);
  }
}
