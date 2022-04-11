import { Body, Controller, Post, UseGuards ,Request} from '@nestjs/common';
import { ProductService } from './product.service';
import { Permissions } from '../../common/authorization/decorator/permission.decorator';
import { PermConst } from '../../common/constants/perm.contants';
import { JwtAuthGuards } from '../../common/authentication/guards/jwt.auth.guards';
import { PermissionGuard } from '../../common/authorization/guards/permission.guards';
import { CreateProductRequestDto } from './dto/create-product.request.dto';


@Controller('/product')
export class ProductController {
  constructor(private readonly productService:ProductService) {


  }
  @Post()
  @Permissions(PermConst.ADMIN)
  @UseGuards(JwtAuthGuards,PermissionGuard)
  async createProduct(@Body() body : CreateProductRequestDto , @Request() req){
    try {
        const result =  await  this.productService.createProductAsync(body,req.user);
        return result;
    }catch (e) {
        throw  e;

    }
  }
}