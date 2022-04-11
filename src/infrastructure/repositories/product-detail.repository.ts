import { EntityRepository, Repository } from 'typeorm';
import { ProductReadModel } from '../../core/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { ProductDetailReadModel } from '../../core/entities/productDetail.entity';

@Injectable()
@EntityRepository(ProductDetailReadModel)
export class ProductDetailRepository extends Repository<ProductDetailReadModel>{
  constructor() {
    super();
  }
  async createProductDetail(data:ProductDetailReadModel){
    return await this.save(data);
  }
  async getProductDetailByColorNameOrColorCode(colorName:string,colorCode:string){
    return await  this.findOne({where:[{colorName},{colorCode}]});
  }
}