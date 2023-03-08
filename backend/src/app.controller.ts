import {
  Body,
  Controller,
  Get,
  HttpServer,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';

import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*
  @Get('/board')
  async getDataFromExternalApi(): Promise<any> {
    const url = 'http://dummy.restapiexample.com/api/v1/employees';
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }j
  */

  @UseGuards(JwtAuthGuard)
  @Get('/auth/profile')
  profile(@Request() req: Request) {
    return (req as any).user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req: Request) {
    return this.authService.login((req as any).user);
  }

  /*
    
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Body() user: CreateUserDto, @Request() req: Request) {
    return (req as any).user;
    const jwt = await this.authService.validateUser(user.email, user.password);
    console.log('jwt: ', jwt);
    
    return jwt;
    */
  /*
    const jwt = this.authService.login(req.user);
    console.log('jwt: ', jwt);
    console.log('jwtToken: ', jwtToken);
    return this.authService.login(req.user);
    */
}
