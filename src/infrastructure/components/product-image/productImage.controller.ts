



import { Controller } from '@nestjs/common';
import { ProductImageService } from './productImage.service';



@Controller()
export class ProductImageController {
  constructor(private readonly productImageService:ProductImageService) {
  }
}