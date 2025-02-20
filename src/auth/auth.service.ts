import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByEmail(email);
    console.log('User:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log('Stored Hash:', user.password);
    console.log('Input Password:', pass);

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    console.log('Password Match:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  validateUser(bearerToken: string): { message: string | object } {
    // Ensure token is in the correct format
    if (!bearerToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }

    const token = bearerToken.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const decodedJwt = this.jwtService.decode(token);

    if (!decodedJwt) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: decodedJwt };
  }
}
