import { Injectable } from '@nestjs/common';
import { database } from 'src/database';

@Injectable()
export class TrackService {
  findAll() {
    return database.track;
  }
}
