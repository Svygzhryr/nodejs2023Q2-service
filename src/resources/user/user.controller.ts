import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { IUpdatePasswordDto } from 'src/types';
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param() { id }: { id: string }) {
    if (!validate(id)) Errors.badId;
    return this.userService.delete(id);
  }
}
