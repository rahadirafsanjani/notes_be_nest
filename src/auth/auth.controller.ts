import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
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

  @HttpCode(HttpStatus.OK)
  @Post('validate')
  validateUser(@Body() bearerToken: { authorization: string }) {
    if (!bearerToken.authorization) {
      throw new UnauthorizedException('Authorization token is required');
    }
    return this.authService.validateUser(bearerToken.authorization);
  }
}
