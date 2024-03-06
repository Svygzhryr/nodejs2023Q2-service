import { Injectable } from '@nestjs/common';
import { database } from 'src/database';

@Injectable()
export class FavsService {
  findAll() {
    return database.favs;
  }
}
