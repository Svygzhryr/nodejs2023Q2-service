import {
  HttpException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
export class Errors {
  static get invalidId() {
    throw new HttpException('Passed id is not valid', 400);
  }

  static get recordNotFound() {
    throw new HttpException('Record with this id is not found', 404);
  }

  static get invalidBody() {
    throw new HttpException(
      'Request body does not contain required fields',
      400,
    );
  }

  static get invalidCreds() {
    throw new HttpException('No user with such login/password', 403);
  }

  static get badId() {
    throw new BadRequestException();
  }

  static get unprocessableEntity() {
    throw new HttpException('Unprocessable entity', 422);
  }

  static get internalServer() {
    throw new InternalServerErrorException();
  }

  static get alreadyExists() {
    throw new HttpException('User already exists', 403);
  }
}

export const errors = {
  400: 'Bad request. Check your url path or request body',
  401: 'Uauthorized',
  403: 'Forbidden. Invalid credentials or user already exists',
  404: 'Record with this id is not found',
  422: 'Unprocessable entity',
  500: 'Internal server error',
};
