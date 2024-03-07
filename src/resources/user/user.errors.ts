import { BadRequestException, HttpException } from '@nestjs/common';

export class UserErrors {
  static get invalidId() {
    throw new HttpException('Passed id is not valid', 400);
  }

  static get invalidUserId() {
    throw new BadRequestException();
  }

  static get userNotFound() {
    throw new HttpException('User with this id is not found', 404);
  }

  static get invalidBody() {
    throw new HttpException(
      'Request body does not contain required fields',
      400,
    );
  }

  static get wrongPassword() {
    throw new HttpException('Wrong old password', 403);
  }
}
