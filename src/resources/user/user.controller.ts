import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getAllUsers(): string {
    return 'All users here';
  }
}
