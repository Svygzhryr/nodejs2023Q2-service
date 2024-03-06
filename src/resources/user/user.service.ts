import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { database } from 'src/database';

@Injectable()
export class UserService {
  // избавляться от пароля потом будем по-другому
  private safeUser = database.user.map((user) => {
    delete user.password;
    return user;
  });

  findAll() {
    return this.safeUser;
  }

  findUser(id: string) {
    if (!validate(id)) {
      throw new HttpException('Passed id is not valid', 400);
    }

    const foundUser = this.safeUser.find((user) => user.id === id);

    if (!foundUser)
      throw new HttpException('User with this id is not found', 404);

    return foundUser;
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
}
