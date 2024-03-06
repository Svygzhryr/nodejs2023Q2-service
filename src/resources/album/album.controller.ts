import { Controller, Get } from '@nestjs/common';

@Controller('album')
export class AlbumController {
  @Get()
  getAllUsers(): string {
    return 'All albums here';
  }
}
