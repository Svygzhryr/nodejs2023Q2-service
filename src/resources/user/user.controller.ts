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
  UseInterceptors,
} from '@nestjs/common';
import { ICreateUserDto, IUpdatePasswordDto, IUser } from 'src/types';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserErrors } from './user.errors';
import { validate } from 'uuid';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): UserEntity[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserById(@Param() { id }: { id: string }): UserEntity {
    if (!validate(id)) UserErrors.invalidId;
    return this.userService.getById(id);
  }

  @Post()
  createUser(@Body() createUserDto: ICreateUserDto): UserEntity {
    const { login, password } = createUserDto;
    if (!login || !password) UserErrors.invalidBody;
    return this.userService.create(login, password);
  }

  @Put(':id')
  changeUserPassword(
    @Param() { id }: { id: string },
    @Body() updatePasswordDto: IUpdatePasswordDto,
  ): UserEntity {
    const { oldPassword, newPassword } = updatePasswordDto;
    if (!newPassword || !oldPassword) UserErrors.invalidBody;
    if (!validate(id)) UserErrors.invalidUserId;
    return this.userService.update(id, oldPassword, newPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() { id }: { id: string }) {
    if (!validate(id)) UserErrors.invalidUserId;
    return this.userService.delete(id);
  }
}
