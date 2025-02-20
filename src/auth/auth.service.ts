import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // async signIn(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOneByEmail(email);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const { password, ...result } = user;
  //   // TODO: Generate a JWT and return it here
  //   // instead of the user object
  //   return result;
  // }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id, email: user.email, message: 'Login successful' };
  }
}
