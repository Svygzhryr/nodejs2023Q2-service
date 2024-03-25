import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  greeting() {
    return 'Greetings! Avaliable endpoints are: /track /album /favs /user /artist';
  }
}
