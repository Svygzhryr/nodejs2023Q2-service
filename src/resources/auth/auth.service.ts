import { Injectable } from '@nestjs/common';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SignUpService {
  constructor(private prisma: PrismaService) {}
}

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}
}
