import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 아래 내용 없어도 되는데 커스텀
  // 아래 예시 느낌
  /*
  class People {
    run() {
      return 'super run';
    }
  }

  class Man extends People {
    run() {
      return 'man run';
    }
  }

  const moon = new Man();

  moon.run();

  */
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
