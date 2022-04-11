import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { Claim } from '../../common/authentication/claims/claims';
import { TypeProductReadModel } from '../../../core/entities/typeproduct.entity';
import { DateTimeHelper, UuidHelper } from '../../common/helper';
import { ProductReadModel } from '../../../core/entities/product.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateProductResponseDto } from './dto/create-product.response.dto';
import { UserReadModel } from '../../../core/entities/user.entity';


@Injectable()
export class ProductService{
  constructor(private readonly productRepository: ProductRepository,
              @InjectMapper() private readonly mapper : Mapper
  ) {
  }
  async createProductAsync (body:CreateProductRequestDto,user: Claim) {
    const existedProduct = await this.productRepository.getProductByCodeOrName(body.code,body.name);

    if(existedProduct){
      throw  new BadRequestException({message:"duplicate name or code"})
    }
    const productReadModel = new ProductReadModel();
    productReadModel.id = UuidHelper.newUuid();
    productReadModel.price = body.price;
    productReadModel.name = body.name;
    productReadModel.code = body.code;
    productReadModel.typeProductId = body.typeProductId;
    productReadModel.normalizedName = body.name.toLocaleUpperCase();
    productReadModel.modifiedDate = DateTimeHelper.getNowUnix();
    productReadModel.modifiedByName = user.name;
    productReadModel.modifiedById = user.id;
    productReadModel.createdDate = DateTimeHelper.getNowUnix();
    productReadModel.createdByName = user.name;
    productReadModel.createdById = user.id

    const product = await  this.productRepository.createProduct(productReadModel);

    return this.mapper.map(product,CreateProductResponseDto,ProductReadModel);
  }

}