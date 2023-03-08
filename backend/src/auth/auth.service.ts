import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.loginUser(email);
    if (!(await bcrypt.compare(password, user?.password ?? ''))) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const payload = { userUid: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
