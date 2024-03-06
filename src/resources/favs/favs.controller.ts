import { Controller, Get } from '@nestjs/common';

@Controller('favs')
export class FavsController {
  @Get()
  getAllUsers(): string {
    return 'All favs here';
  }
}
