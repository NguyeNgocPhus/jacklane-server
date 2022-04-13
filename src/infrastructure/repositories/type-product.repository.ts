import { EntityRepository, Repository } from 'typeorm';
import { TypeProductReadModel } from '../../core/entities/typeproduct.entity';
import { Injectable } from '@nestjs/common';


@Injectable()
@EntityRepository(TypeProductReadModel)
export class TypeProductRepository extends Repository<TypeProductReadModel>{
  constructor() {
    super();
  }

  async createTypeProduct(data:TypeProductReadModel){
    return await this.save(data);
  }
  async getTypeProductByName(name:string){
    return await this.findOne({name});
  }
  async getTypeProductById(id:string){
    return await this.findOne({id});
  }
  async getAllTypeProduct(){
    return await this.find();
  }
  async deleteAllTypeProduct(id:string){
    return await this.delete({id});
  }
  async getTypeProductBySlug(nameSlug:string){
    const result= await this.createQueryBuilder('type_product')
      .leftJoinAndSelect('type_product.products','p')
      .leftJoinAndSelect('p.productDetails','pd')
      .leftJoinAndSelect('p.images','img')
      .where("type_product.nameSlug = :nameSlug",{nameSlug:nameSlug})
      .select(['type_product.id','type_product.name','p.id','p.name','pd.colorName','img.name'])
      .getOne()
    return result;
  }
}