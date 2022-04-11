import { Controller } from '@nestjs/common';
import { ProductDetailService } from './productDetail.service';


@Controller()
export class ProductDetailController {
  constructor(private readonly productDetailService:ProductDetailService) {
  }
}