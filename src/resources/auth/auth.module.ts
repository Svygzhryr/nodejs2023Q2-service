import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SignUpController } from './auth.controller';
import { LoginService, SignUpService } from './auth.service';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService, LoginService, PrismaService],
})
export class FavsModule {}
