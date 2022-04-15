import { BadRequestException, Body, Controller, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductDetailService } from './productDetail.service';
import { CreateProductDetailRequestDto } from './dto/create-product-detail.request.dto';
import { Permissions } from '../../common/authorization/decorator/permission.decorator';
import { PermConst } from '../../common/constants/perm.contants';
import { JwtAuthGuards } from '../../common/authentication/guards/jwt.auth.guards';
import { PermissionGuard } from '../../common/authorization/guards/permission.guards';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileTypeEnum } from '../../../core/common/enum/fileUpload';
import { convertStringToSlug } from '../../common/helper';
import * as path from "path";
import { ProductRepository } from '../../repositories/product.repository';
import LocalFilesInterceptor from '../../common/upload-image';

@Controller('/product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService:ProductDetailService,private productRepository:ProductRepository) {
  }

  @Post()
  @UseInterceptors(LocalFilesInterceptor())
  @Permissions(PermConst.ADMIN)
  @UseGuards(JwtAuthGuards,PermissionGuard)
  async createProductDetail(@UploadedFiles() files: Array<Express.Multer.File>,@Body() body:CreateProductDetailRequestDto,@Request() req){
      try {
        if(files.length === 0){
          throw new BadRequestException({message:"vui long upload anh"})
        }

        const result = await this.productDetailService.createProductDetailAsync(files,body,req.user);
        return result;
      }catch (e) {
        throw e;
      }
  }
}