import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ICreateUserDto, IUpdatePasswordDto, IUser } from 'src/types';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { validate } from 'uuid';
import { Errors } from 'src/errors';
import { HttpExceptionFilter } from 'src/exception.filter';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserById(@Param() { id }: { id: string }): Promise<UserEntity> {
    if (!validate(id)) Errors.invalidId;
    return this.userService.getById(id);
  }

  @Post()
  createUser(@Body() createUserDto: ICreateUserDto): Promise<UserEntity> {
    const { login, password } = createUserDto;
    if (!login || !password) Errors.invalidBody;
    return this.userService.create(login, password);
  }

  @Put(':id')
  changeUserPassword(
    @Param() { id }: { id: string },
    @Body() updatePasswordDto: IUpdatePasswordDto,
  ): Promise<UserEntity> {
    const { oldPassword, newPassword } = updatePasswordDto;
    if (!newPassword || !oldPassword) Errors.invalidBody;
    if (!validate(id)) Errors.badId;
    return this.userService.update(id, oldPassword, newPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() { id }: { id: string }) {
    if (!validate(id)) Errors.badId;
    return this.userService.delete(id);
  }
}
