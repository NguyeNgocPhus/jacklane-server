import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductImageModule } from '../product-image/productImage.module';


@Module({
  imports:[TypeOrmModule.forFeature([ProductRepository]),ProductImageModule],
  controllers:[ProductController],
  providers:[ProductService],
  exports:[]
})
export class ProductModule {

}