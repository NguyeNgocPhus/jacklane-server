import { Module } from '@nestjs/common';
import { ProductImageController } from './productImage.controller';
import { ProductImageService } from './productImage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageRepository } from '../../repositories/product-image.repository';


@Module({
  imports:[TypeOrmModule.forFeature([ProductImageRepository])],
  controllers:[ProductImageController],
  providers:[ProductImageService],
  exports:[ProductImageService]
})
export class ProductImageModule {

}