import { Controller, Get } from '@nestjs/common';

@Controller('artist')
export class ArtistController {
  @Get()
  getAllUsers(): string {
    return 'All artists here';
  }
}
