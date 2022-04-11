import { Module } from '@nestjs/common';
import { ProductImageController } from './productImage.controller';
import { ProductImageService } from './productImage.service';


@Module({
  imports:[],
  controllers:[ProductImageController],
  providers:[ProductImageService],
  exports:[]
})
export class ProductImageModule {

}