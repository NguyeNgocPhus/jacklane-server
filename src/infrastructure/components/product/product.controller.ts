import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Permissions } from '../../common/authorization/decorator/permission.decorator';
import { PermConst } from '../../common/constants/perm.contants';
import { JwtAuthGuards } from '../../common/authentication/guards/jwt.auth.guards';
import { PermissionGuard } from '../../common/authorization/guards/permission.guards';
import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { fileTypeEnum } from '../../../core/common/enum/fileUpload';
import { convertStringToSlug } from '../../common/helper';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {


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
  @UseGuards(JwtAuthGuards, PermissionGuard)
  async createProduct(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: CreateProductRequestDto, @Request() req) {
    try {
        const result = await this.productService.createProductAsync(files,body,req.user);
        return result;

    } catch (e) {
      throw  e;

    }
  }

  @Get('/:id')
  async getProductById(@Param('id') param: string) {
    try {
      const result = await this.productService.getProductByIdAsync(param);
      return result;
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async getAllProduct() {
    try {
      const result = await this.productService.getAllProductAsync();
      return result;
    } catch (e) {
      throw e;
    }
  }


}