import { Injectable } from '@nestjs/common';
import { ProductImageRepository } from 'src/infrastructure/repositories/product-image.repository';
import { ImageProductReadModel } from '../../../core/entities/imageProduct.entity';


@Injectable()
export class ProductImageService{
    constructor(private readonly productImageRepository:ProductImageRepository) {
    }
    async createProductImageAsync (data:ImageProductReadModel) {
      return await this.productImageRepository.createProductImage(data);
    }
}