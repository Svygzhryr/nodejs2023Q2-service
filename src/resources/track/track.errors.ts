import { BadRequestException, HttpException } from '@nestjs/common';

export class TrackErrors {
  static get invalidId() {
    throw new HttpException('Passed id is not valid', 400);
  }

  static get invalidTrackId() {
    throw new BadRequestException();
  }

  static get trackNotFound() {
    throw new HttpException('Track with this id is not found', 404);
  }

  static get invalidBody() {
    throw new HttpException(
      'Request body does not contain required fields',
      400,
    );
  }
}
