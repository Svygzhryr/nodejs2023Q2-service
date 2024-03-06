import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ICreateUserDto, IUser } from 'src/types';
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

  @Post()
  createUser(@Body() createUserDto: ICreateUserDto): IUser {
    const { login, password } = createUserDto;
    return this.userService.createUser(login, password);
  }
}
