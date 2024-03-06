import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ICreateUserDto, IUpdatePasswordDto, IUser } from 'src/types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): IUser[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param() { id }: { id: string }): IUser {
    return this.userService.findUser(id);
  }

  @Put(':id')
  changeUserPassword(
    @Param() { id }: { id: string },
    @Body() updatePasswordDto: IUpdatePasswordDto,
  ) {
    const { oldPassword, newPassword } = updatePasswordDto;
    return this.userService.updateUser(id, oldPassword, newPassword);
  }

  @Post()
  createUser(@Body() createUserDto: ICreateUserDto): IUser {
    const { login, password } = createUserDto;
    return this.userService.createUser(login, password);
  }
}
