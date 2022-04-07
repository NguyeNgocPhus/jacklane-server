import { IConfigService } from '../../../../core/common/services/config.interface';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';



@Injectable()
export class ConfigService implements  IConfigService {
  constructor() {
    const path = join(`.env.${process.env.NODE_ENV}`)
    console.log(path);
    dotenv.config({path});

  }
  get (key:string){
    return process.env[key];
  }
}
