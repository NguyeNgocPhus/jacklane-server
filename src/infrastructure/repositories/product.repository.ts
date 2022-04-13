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
   async getProductByCodeOrName(name:string){
     return await  this.findOne({name});
   }
  async getProductById(id:string){
    return await  this.findOne({id});
  }
  async getAllProduct(){
    return await  this.find({
      relations:['productDetails']
    });
  }
}