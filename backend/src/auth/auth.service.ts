import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('validateUser');
  }

  async login(user: any) {
    const payload = { userUid: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
