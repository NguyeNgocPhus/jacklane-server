



import { Controller } from '@nestjs/common';
import { TypeProductService } from './typeproduct.service';
// import { ProductImageService } from './productImage.service';



@Controller()
export class TypeProductController {
  constructor(private readonly typeProductService:TypeProductService) {
  }
}