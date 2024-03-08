import { BadRequestException, HttpException } from '@nestjs/common';

export class AlbumErrors {
  static get invalidId() {
    throw new HttpException('Passed id is not valid', 400);
  }

  static get invalidAlbumId() {
    throw new BadRequestException();
  }

  static get albumNotFound() {
    throw new HttpException('Album with this id is not found', 404);
  }

  static get invalidBody() {
    throw new HttpException(
      'Request body does not contain required fields',
      400,
    );
  }
}
