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
}