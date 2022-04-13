import { Module } from '@nestjs/common';
import { ProductDetailController } from './productDetail.controller';
import { ProductDetailService } from './productDetail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetailRepository } from '../../repositories/product-detail.repository';
import { ProductImageModule } from '../product-image/productImage.module';


@Module({
  imports:[TypeOrmModule.forFeature([ProductDetailRepository]),ProductImageModule],
  controllers:[ProductDetailController],
  providers:[ProductDetailService],
  exports:[]
})
export class ProductDetailModule {

}