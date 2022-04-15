import { Module } from '@nestjs/common';
import { ProductDetailController } from './productDetail.controller';
import { ProductDetailService } from './productDetail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetailRepository } from '../../repositories/product-detail.repository';
import { ProductImageModule } from '../product-image/productImage.module';
import { ProductRepository } from '../../repositories/product.repository';


@Module({
  imports:[TypeOrmModule.forFeature([ProductDetailRepository,ProductRepository]),ProductImageModule],
  controllers:[ProductDetailController],
  providers:[ProductDetailService],
  exports:[]
})
export class ProductDetailModule {

}