import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IConfigService } from './core/common/services/config.interface';
import * as tinh from "./data/tinh.json";
import * as qh from "./data/quan-huyen.json";

@Controller("/tinh")
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService:IConfigService) {}

  @Get()
  getHello(): any {
    function compare( a, b ) {
      if ( a.slug < b.slug ){
        return -1;
      }
      if ( a.slug > b.slug ){
        return 1;
      }
      return 0;
    }

    let arr = [];
    let arr1 = [];
    let arr2 = [];
    Object.entries(tinh).forEach(([key, value]) => {
      if(value.code!=='01' && value.code!=='79' ){
        arr.push(value);
      }else{
        arr1.push(value);
      }
    });
    Object.entries(qh).forEach(([key, value]) => {
      arr2.push(value);
    });
    arr1.reverse()
    // console.log(arr1);
    arr.sort(compare);

    return arr2;
  }
}
