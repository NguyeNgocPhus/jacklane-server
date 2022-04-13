import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeProductRepository } from '../../repositories/type-product.repository';
import { CreateTypeProductDto } from './dto/create-typeproduct.request';
import { Claim } from '../../common/authentication/claims/claims';
import { TypeProductReadModel } from '../../../core/entities/typeproduct.entity';
import { DateTimeHelper, UuidHelper } from '../../common/helper';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateTypeProductResponse } from './dto/create-typeproduct.response';
import { DuplicateNameException } from '../../common/exceptions/duplicate-name.exception';


@Injectable()
export class TypeProductService{
  constructor(private readonly typeProductRepository : TypeProductRepository,
              @InjectMapper() private readonly  mapper : Mapper
  ) {
  }

  async createTypeProductAsync (body:CreateTypeProductDto,user:Claim ) {
      const existTypeProduct = await this.typeProductRepository.getTypeProductByName(body.name);

      if(existTypeProduct){
          throw new DuplicateNameException("duplicate field name")
      }

      const slug = body.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      const code = body.type+'-'+Math.random().toString().slice(-6);
      const typeProductReadModel = new TypeProductReadModel();
      typeProductReadModel.id = UuidHelper.newUuid();
      typeProductReadModel.type = body.type;
      typeProductReadModel.name = body.name.toLowerCase();
      typeProductReadModel.nameSlug = slug.replace(/\s+/g, '-');
      typeProductReadModel.code =code;
      typeProductReadModel.normalizedName = body.name.toLocaleUpperCase();
      typeProductReadModel.modifiedDate = DateTimeHelper.getNowUnix();
      typeProductReadModel.modifiedByName = user.name;
      typeProductReadModel.modifiedById = user.id;
      typeProductReadModel.createdDate = DateTimeHelper.getNowUnix();
      typeProductReadModel.createdByName = user.name;
      typeProductReadModel.createdById = user.id;

      const typeProduct = await this.typeProductRepository.createTypeProduct(typeProductReadModel);

      return this.mapper.map(typeProduct,CreateTypeProductResponse,TypeProductReadModel);
  }
  async getAllTypeProductAsync () {
    return await this.typeProductRepository.getAllTypeProduct();
  }
  async deleteAllTypeProductAsync () {
    const allTypeProduct = await this.typeProductRepository.getAllTypeProduct();

    allTypeProduct.map(async(data)=>{
      await this.typeProductRepository.deleteAllTypeProduct(data.id);
    })


    return allTypeProduct;
  }
  async getTypeProductBySlug(nameSlug:string) {
    const data =  await  this.typeProductRepository.getTypeProductBySlug(nameSlug);
    return data;
  }
}