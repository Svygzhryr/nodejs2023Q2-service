import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';

import { HttpExceptionFilter } from 'src/exception.filter';
import { AuthService } from './auth.service';
import { Errors } from 'src/errors';
import { ICreateUserDto } from 'src/types';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  createUser(@Body() createUserDto: ICreateUserDto): Promise<object> {
    const { login, password } = createUserDto;
    if (
      !login ||
      !password ||
      (typeof login !== 'string' && typeof password !== 'string')
    )
      Errors.invalidBody;
    return this.authService.signUp(login, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() createUserDto: ICreateUserDto): Promise<object> {
    const { login, password } = createUserDto;
    if (
      !login ||
      !password ||
      (typeof login !== 'string' && typeof password !== 'string')
    )
      Errors.invalidBody;
    return this.authService.login(login, password);
  }
}
