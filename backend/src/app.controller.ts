import { Controller, Get, HttpServer } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  [x: string]: any;
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/board')
  async getDataFromExternalApi(): Promise<any> {
    const url = 'http://dummy.restapiexample.com/api/v1/employees';
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }
}
