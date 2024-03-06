import { HttpException } from '@nestjs/common';

export class UserErrors {
  static invalidId() {
    throw new HttpException('Passed id is not valid', 400);
  }

  static userNotFound() {
    throw new HttpException('User with this id is not found', 404);
  }

  static invalidBody() {
    throw new HttpException(
      'Request body does not contain required fields',
      400,
    );
  }

  static wrongPassword() {
    throw new HttpException('Wrong old password', 403);
  }
}
