import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'src/database';
import { UserErrors } from './user.errors';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private _foundUser(id: string) {
    return database.user.find((user) => user.id === id);
  }

  getAll() {
    const safeUsers: UserEntity[] = [];
    database.user.forEach((user) => {
      safeUsers.push(new UserEntity({ ...user }));
    });
    return safeUsers;
  }

  getById(id: string) {
    const user = this._foundUser(id);
    if (!user) UserErrors.userNotFound;
    return new UserEntity({ ...user });
  }

  create(login: string, password: string) {
    // не забыть добавить сюда валидацию логина и пароля

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
    if (!user) UserErrors.userNotFound;
    if (oldPassword !== user.password) UserErrors.wrongPassword;
    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return new UserEntity({ ...user });
  }

  delete(id: string) {
    const user = this._foundUser(id);
    if (!user) UserErrors.userNotFound;
    database.user = database.user.filter((dbuser) => dbuser !== user);
  }
}
