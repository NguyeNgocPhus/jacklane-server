import { EntityRepository, Repository } from 'typeorm';
import { ProductReadModel } from '../../core/entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(ProductReadModel)
export class ProductRepository extends Repository<ProductReadModel>{
   constructor() {
     super();
   }
   async createProduct(data:ProductReadModel){
     return await this.save(data);
   }
   async getProductByCodeOrName(code:string,name:string){
     return await  this.findOne({where:[{code},{name}]});
   }
  async getProductById(id:string){
    return await  this.findOne({id});
  }
}