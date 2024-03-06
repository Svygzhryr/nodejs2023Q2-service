import { Injectable } from '@nestjs/common';
import { database } from 'src/database';

@Injectable()
export class AlbumService {
  findAll() {
    return database.album;
  }
}
