import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { UsersController } from './users/users.controller';
import { jwtMiddleware } from './middleware/jwt.middleware';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/testDB1'),
    UsersModule,
    AuthModule,
    PassportModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalAuthGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(jwtMiddleware)
      // .forRoutes('/users')
      // .exclude({ path: 'users', method: RequestMethod.GET },)
      .forRoutes(UsersController);
  }
}
