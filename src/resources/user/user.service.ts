import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { database } from 'src/database';
import { UserErrors } from './user.errors';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private _foundUser(id: string) {
    return database.user.find((user) => user.id === id);
  }

  findAll() {
    const safeUsers: UserEntity[] = [];
    database.user.forEach((user) => {
      safeUsers.push(new UserEntity({ ...user }));
    });
    return safeUsers;
  }

  findUser(id: string) {
    const user = this._foundUser(id);
    if (!user) UserErrors.userNotFound();
    return new UserEntity({ ...user });
  }

  updateUser(id: string, oldPassword: string, newPassword: string) {
    const user = this._foundUser(id);
    if (!user) UserErrors.userNotFound();
    if (oldPassword !== user.password) UserErrors.wrongPassword();
    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return new UserEntity({ ...user });
  }

  createUser(login: string, password: string) {
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

  deleteUser(id: string) {
    const user = this._foundUser(id);
    if (!user) UserErrors.userNotFound();
    database.user = database.user.filter((dbuser) => dbuser !== user);
  }
}
