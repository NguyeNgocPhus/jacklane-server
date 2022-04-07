import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IConfigService } from './core/common/services/config.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService:IConfigService) {}

  @Get()
  getHello(): string {
    return this.configService.get("PORT")
  }
}
