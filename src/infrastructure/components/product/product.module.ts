import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../../repositories/product.repository';


@Module({
  imports:[TypeOrmModule.forFeature([ProductRepository])],
  controllers:[ProductController],
  providers:[ProductService],
  exports:[]
})
export class ProductModule {

}