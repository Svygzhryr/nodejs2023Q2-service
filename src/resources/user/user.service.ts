import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { UserEntity } from './user.entity';
import { Errors } from 'src/errors';

@Injectable()
export class UserService {
  private _foundUser = (id: string) =>
    database.user.find((user) => user.id === id);

  getAll() {
    const safeUsers: UserEntity[] = [];
    database.user.forEach((user) => {
      safeUsers.push(new UserEntity({ ...user }));
    });
    return safeUsers;
  }

  getById(id: string) {
    const user = this._foundUser(id);
    if (!user) Errors.recordNotFound;
    return new UserEntity({ ...user });
  }

  create(login: string, password: string) {
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    database.user.push(user);
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
