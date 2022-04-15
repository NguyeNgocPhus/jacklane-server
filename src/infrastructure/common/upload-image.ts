import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException, Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { fileTypeEnum } from '../../core/common/enum/fileUpload';
import { convertStringToSlug } from './helper';
import * as path from 'path';
import { ProductRepository } from '../repositories/product.repository';
import * as fs from 'fs';


function LocalFilesInterceptor(): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor(private readonly productRepository: ProductRepository) {

      const multerOptions: MulterOptions = {
        storage: diskStorage({
            filename: (req, file, cb) => {


              const filename = convertStringToSlug.convert(path.parse(file.originalname).name);
              const mimetype = path.parse(file.originalname).ext;
              cb(null, `${filename}_${Date.now()}${mimetype}`);
            },
            destination: async (req, file, cb) => {
              if(!file){
                throw new BadRequestException({message:"vui long nhap file"})
              }
              const a = await productRepository.getProductById(req.body.productId);
              const p = path.join(__dirname, '../../../', `/src/images/${a.typeProduct.type}`);

              if (!fs.existsSync(p)) {
                 fs.mkdirSync(p);
              }
              if (!fs.existsSync(`${p}/${a.typeProduct.nameSlug}`)) {
                 fs.mkdirSync(`${p}/${a.typeProduct.nameSlug}`);
              }
              if (file.mimetype !== fileTypeEnum.JPEG && file.mimetype !== fileTypeEnum.PNG && file.mimetype !== fileTypeEnum.JPG) {
                cb(new BadRequestException({ message: 'sai kieu' }), null);
              } else {
                cb(null, `./src/images/${a.typeProduct.type}/${a.typeProduct.nameSlug}`);
              }

            },

          },
        ),
      };

      this.fileInterceptor = new (AnyFilesInterceptor(multerOptions));
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}

export default LocalFilesInterceptor;