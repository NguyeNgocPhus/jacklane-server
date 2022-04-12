import { EntityRepository, Repository } from 'typeorm';
import { ProductReadModel } from '../../core/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { ProductDetailReadModel } from '../../core/entities/productDetail.entity';
import { ImageProductReadModel } from '../../core/entities/imageProduct.entity';

@Injectable()
@EntityRepository(ImageProductReadModel)
export class ProductImageRepository extends Repository<ImageProductReadModel>{
  constructor() {
    super();
  }
  async createProductImage(data:ImageProductReadModel){
    return await this.save(data);
  }

}