import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDetailRepository } from '../../repositories/product-detail.repository';
import { CreateProductDetailRequestDto } from './dto/create-product-detail.request.dto';
import { Claim } from '../../common/authentication/claims/claims';
import { ProductReadModel } from '../../../core/entities/product.entity';
import { DateTimeHelper, UuidHelper } from '../../common/helper';
import { ProductDetailReadModel } from '../../../core/entities/productDetail.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateProductDetailResponseDto } from './dto/create-product-detail.response.dto';


@Injectable()
export class ProductDetailService{
  constructor(private readonly productDetailRepository : ProductDetailRepository,
              @InjectMapper() private  readonly mapper : Mapper
  ) {
  }
  async createProductDetailAsync(body:CreateProductDetailRequestDto,user:Claim){
    const existColor = await this.productDetailRepository.getProductDetailByColorNameOrColorCode(body.colorName,body.colorCode);

    if(existColor){
      throw new BadRequestException({message:"duplicate color"})
    }
    const productDetailReadModel = new ProductDetailReadModel();
    productDetailReadModel.id = UuidHelper.newUuid();
    productDetailReadModel.colorCode = body.colorCode;
    productDetailReadModel.colorName = body.colorName;
    productDetailReadModel.amount = body.amount;
    productDetailReadModel.size = body.size;
    productDetailReadModel.productId = body.productId;
    productDetailReadModel.modifiedDate = DateTimeHelper.getNowUnix();
    productDetailReadModel.modifiedByName = user.name;
    productDetailReadModel.modifiedById = user.id;
    productDetailReadModel.createdDate = DateTimeHelper.getNowUnix();
    productDetailReadModel.createdByName = user.name;
    productDetailReadModel.createdById = user.id;

    const productDetail = await this.productDetailRepository.createProductDetail(productDetailReadModel);

    return this.mapper.map(productDetail,CreateProductDetailResponseDto,ProductDetailReadModel);

  }

}