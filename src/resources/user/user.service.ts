import { Injectable } from '@nestjs/common';
import { database } from 'src/database';

@Injectable()
export class UserService {
  findAll() {
    return database.user;
  }
}
