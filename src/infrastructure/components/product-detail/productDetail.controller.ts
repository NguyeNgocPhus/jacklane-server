import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ProductDetailService } from './productDetail.service';
import { CreateProductDetailRequestDto } from './dto/create-product-detail.request.dto';
import { Permissions } from '../../common/authorization/decorator/permission.decorator';
import { PermConst } from '../../common/constants/perm.contants';
import { JwtAuthGuards } from '../../common/authentication/guards/jwt.auth.guards';
import { PermissionGuard } from '../../common/authorization/guards/permission.guards';

@Controller('/product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService:ProductDetailService) {
  }

  @Post()
  @Permissions(PermConst.ADMIN)
  @UseGuards(JwtAuthGuards,PermissionGuard)
  async createProductDetail(@Body() body:CreateProductDetailRequestDto,@Request() req){
      try {
        const result = await this.productDetailService.createProductDetailAsync(body,req.user);
        return result;
      }catch (e) {
        throw e;
      }
  }
}