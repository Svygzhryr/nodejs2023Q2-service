import { BadRequestException, HttpException } from '@nestjs/common';

export class ArtistErrors {
  static get invalidId() {
    throw new HttpException('Passed id is not valid', 400);
  }

  static get invalidArtistId() {
    throw new BadRequestException();
  }

  static get artistNotFound() {
    throw new HttpException('Artist with this id is not found', 404);
  }

  static get invalidBody() {
    throw new HttpException(
      'Request body does not contain required fields',
      400,
    );
  }
}
