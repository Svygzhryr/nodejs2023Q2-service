import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { UserEntity } from './user.entity';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';
import { IUser } from 'src/types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private _foundUser = (id: string) =>
    database.user.find((user) => user.id === id);

  async getAll() {
    const safeUsers: UserEntity[] = [];
    database.user.forEach((user) => {
      safeUsers.push(new UserEntity({ ...user }));
    });
    const users = (await this.prisma.users.findMany()) as unknown as IUser[];
    console.log(users);
    return users;
  }

  getById(id: string) {
    const user = this._foundUser(id);
    if (!user) Errors.recordNotFound;
    return new UserEntity({ ...user });
  }

  async create(login: string, password: string) {
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    // database.user.push(user);
    await this.prisma.users.create({ data: user });
    return new UserEntity({ ...user });
  }

  update(id: string, oldPassword: string, newPassword: string) {
    const user = this._foundUser(id);
    if (!user) Errors.recordNotFound;
    if (oldPassword !== user.password) Errors.wrongPassword;
    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return new UserEntity({ ...user });
  }

  delete(id: string) {
    const user = this._foundUser(id);
    if (!user) Errors.recordNotFound;
    database.user = database.user.filter((dbuser) => dbuser !== user);
  }
}
