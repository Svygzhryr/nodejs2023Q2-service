import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { database } from 'src/database';
import { UserErrors } from './user.errors';

@Injectable()
export class UserService {
  // избавляться от пароля потом будем по-другому
  private _safeUsers = structuredClone(database.user).map((user) => {
    delete user.password;
    return user;
  });

  private _foundUser(id: string) {
    return database.user.find((user) => user.id === id);
  }

  // эта чушь тоже занимает слишком много места
  private _foundSafeUser(id: string) {
    return this._safeUsers.find((user) => user.id === id);
  }

  findAll() {
    return this._safeUsers;
  }

  findUser(id: string) {
    if (!validate(id)) UserErrors.invalidId();

    const user = this._foundSafeUser(id);

    if (!user) UserErrors.userNotFound();

    return user;
  }

  updateUser(id: string, oldPassword: string, newPassword: string) {
    if (!validate(id)) UserErrors.invalidId();

    const user = this._foundUser(id);

    if (!user) UserErrors.userNotFound();
    if (oldPassword !== user.password) UserErrors.wrongPassword();
    if (!newPassword) UserErrors.invalidBody();

    user.password = newPassword;
    return this._foundSafeUser(id);
  }

  createUser(login: string, password: string) {
    // не забыть добавить сюда валидацию логина и пароля

    if (!login || !password)
      throw new HttpException(
        'Request body does not contain required fields',
        400,
      );

    const user = {
      id: uuidv4(),
      login,
      password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    database.user.push(user);
    const response = (({ password, ...props }) => props)(user);
    return response;
  }

  deleteUser(id: string) {
    if (!validate(id)) UserErrors.invalidId();
    const user = this._foundUser(id);
    if (!user) UserErrors.userNotFound();

    database.user.splice(
      database.user.findIndex((user) => (user.id = id)),
      1,
    );

    return this._foundSafeUser(id);
  }
}
