import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
