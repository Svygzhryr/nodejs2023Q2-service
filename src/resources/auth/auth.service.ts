import { Injectable } from '@nestjs/common';
import { Errors } from 'src/errors';
import { PrismaService } from '../prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(login: string, password: string) {
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const existingUser = await this.prisma.users.findFirst({
      where: { login },
    });
    if (existingUser) Errors.alreadyExists;
    await this.prisma.users.create({ data: user });
    return { statusCode: 200, message: 'User created succesfully!' };
  }

  async login(login: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        login,
        password,
      },
    });
    if (!user) Errors.invalidCreds;

    const payload = { sub: user.id, login: user.login };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
