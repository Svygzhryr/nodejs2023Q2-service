import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './user.entity';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';
import { IUser } from 'src/types';

// nestjs 'do not know how to serialize a BigInt' fix
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private _foundUser = async (id: string) => {
    try {
      return (await this.prisma.users.findUnique({
        where: {
          id,
        },
      })) as unknown as IUser;
    } catch (err) {
      Errors.internalServer;
    }
  };

  async getAll() {
    const safeUsers: UserEntity[] = [];
    const users = await this.prisma.users.findMany();
    users.forEach((user) => {
      safeUsers.push(new UserEntity({ ...user }));
    });
    return safeUsers;
  }

  async getById(id: string) {
    const user = await this._foundUser(id);
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
    await this.prisma.users.create({ data: user });
    return new UserEntity({ ...user });
  }

  async update(id: string, oldPassword: string, newPassword: string) {
    const user = await this._foundUser(id);
    if (!user) Errors.recordNotFound;
    if (oldPassword !== user.password) Errors.invalidCreds;
    user.password = newPassword;
    user.version++;
    user.updatedAt = +Date.now();
    user.createdAt = Number(user.createdAt);
    await this.prisma.users.update({
      where: {
        id,
      },
      data: { ...user },
    });

    return new UserEntity({ ...user });
  }

  async delete(id: string) {
    const user = await this._foundUser(id);
    if (!user) Errors.recordNotFound;
    await this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
