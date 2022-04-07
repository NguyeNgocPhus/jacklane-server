import { Module } from '@nestjs/common';
import { IConfigService } from '../../../../core/common/services/config.interface';
import { ConfigService } from './config.service';


@Module({
  imports:[],
  providers:[
    {
      provide:IConfigService,
      useClass: ConfigService
    }
  ],
  exports:[IConfigService]
})
export class ConfigModule{}