import { Controller, UseFilters } from '@nestjs/common';

import { HttpExceptionFilter } from 'src/exception.filter';
import { LoginService, SignUpService } from './auth.service';

@Controller('signup')
@UseFilters(new HttpExceptionFilter())
export class SignUpController {
  constructor(private signupService: SignUpService) {}
}

@Controller('login')
@UseFilters(new HttpExceptionFilter())
export class LoginController {
  constructor(private loginService: LoginService) {}
}
