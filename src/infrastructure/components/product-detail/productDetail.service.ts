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
import { ImageProductReadModel } from '../../../core/entities/imageProduct.entity';
import { ProductImageService } from '../product-image/productImage.service';


@Injectable()
export class ProductDetailService{
  constructor(private readonly productDetailRepository : ProductDetailRepository,
              @InjectMapper() private  readonly mapper : Mapper,
              private readonly productImageService: ProductImageService,
  ) {
  }
  async createProductDetailAsync(files :  Array<Express.Multer.File>,body:CreateProductDetailRequestDto,user:Claim){
    const existColor = await this.productDetailRepository.getProductDetailByColorNameOrColorCode(body.colorName,body.colorCode,body.productId);

    if(existColor){
      throw new BadRequestException({message:"duplicate color with this product"})
    }
    const size = body.size.split(',')
    const productDetailReadModel = new ProductDetailReadModel();
    productDetailReadModel.id = UuidHelper.newUuid();
    productDetailReadModel.colorCode = body.colorCode;
    productDetailReadModel.colorName = body.colorName;
    productDetailReadModel.amount = parseInt(body.amount);
    productDetailReadModel.size = size;
    productDetailReadModel.productId = body.productId;
    productDetailReadModel.modifiedDate = DateTimeHelper.getNowUnix();
    productDetailReadModel.modifiedByName = user.name;
    productDetailReadModel.modifiedById = user.id;
    productDetailReadModel.createdDate = DateTimeHelper.getNowUnix();
    productDetailReadModel.createdByName = user.name;
    productDetailReadModel.createdById = user.id;
    const productDetail = await this.productDetailRepository.createProductDetail(productDetailReadModel);
    files.map(async(file,index) => {
      const productImage = new ImageProductReadModel();
      productImage.name = file.filename;
      productImage.mimetype = file.mimetype;
      productImage.productDetailId = productDetailReadModel.id;
      productImage.modifiedDate = DateTimeHelper.getNowUnix();
      productImage.modifiedByName = user.name;
      productImage.modifiedById = user.id;
      productImage.createdDate = DateTimeHelper.getNowUnix();
      productImage.createdByName = user.name;
      productImage.createdById = user.id
      await this.productImageService.createProductImageAsync(productImage);
    });
    return this.mapper.map(productDetail,CreateProductDetailResponseDto,ProductDetailReadModel);

  }

}