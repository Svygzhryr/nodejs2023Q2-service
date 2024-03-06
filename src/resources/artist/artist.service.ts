import { Injectable } from '@nestjs/common';
import { database } from 'src/database';

@Injectable()
export class ArtistService {
  findAll() {
    return database.artist;
  }
}
