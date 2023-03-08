import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/testDB1'),
    UsersModule,
    BoardsModule,
    AuthModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalAuthGuard],
})
export class AppModule {}
