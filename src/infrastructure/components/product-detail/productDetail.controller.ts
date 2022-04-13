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

@Controller('/product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService:ProductDetailService) {
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (file.mimetype !== fileTypeEnum.JPEG && file.mimetype !== fileTypeEnum.PNG && file.mimetype !== fileTypeEnum.JPG) {
          cb(new BadRequestException({ message: 'sai kieu' }), null);
        } else {
          cb(null, './src/images');
        }

      },
      filename: (req, file, cb) => {
        const filename = convertStringToSlug(path.parse(file.originalname).name);
        const mimetype = path.parse(file.originalname).ext;
        cb(null, `${filename}_${Date.now()}${mimetype}`);
      },
    }),
  }))
  @Permissions(PermConst.ADMIN)
  @UseGuards(JwtAuthGuards,PermissionGuard)
  async createProductDetail(@UploadedFiles() files: Array<Express.Multer.File>,@Body() body:CreateProductDetailRequestDto,@Request() req){
      try {
        const result = await this.productDetailService.createProductDetailAsync(files,body,req.user);
        return result;
      }catch (e) {
        throw e;
      }
  }
}