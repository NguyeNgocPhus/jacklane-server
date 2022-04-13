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
  @Permissions(PermConst.ADMIN)
  @UseGuards(JwtAuthGuards, PermissionGuard)
  async createProduct(@Body() body: CreateProductRequestDto, @Request() req) {
    try {
        const result = await this.productService.createProductAsync(body,req.user);
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