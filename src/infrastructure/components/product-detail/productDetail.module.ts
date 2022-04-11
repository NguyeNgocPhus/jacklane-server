import { Module } from '@nestjs/common';
import { ProductDetailController } from './productDetail.controller';
import { ProductDetailService } from './productDetail.service';


@Module({
  imports:[],
  controllers:[ProductDetailController],
  providers:[ProductDetailService],
  exports:[]
})
export class ProductDetailModule {

}