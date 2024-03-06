import { Controller, Get } from '@nestjs/common';

@Controller('track')
export class TrackController {
  @Get()
  getAllUsers(): string {
    return 'All tracks here';
  }
}
