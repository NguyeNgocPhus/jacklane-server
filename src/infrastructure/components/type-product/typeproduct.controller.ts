import { Body, Controller, Post, UseGuards,Request } from '@nestjs/common';
import { TypeProductService } from './typeproduct.service';
import { PermConst } from '../../common/constants/perm.contants';
import { JwtStrategy } from '../../common/authentication/strategies/jwt.strategy';
import { PermissionGuard } from '../../common/authorization/guards/permission.guards';
import { Permissions } from '../../common/authorization/decorator/permission.decorator';
import { JwtAuthGuards } from '../../common/authentication/guards/jwt.auth.guards';
import { CreateTypeProductDto } from './dto/create-typeproduct.request';



@Controller('/type-product')
export class TypeProductController {
  constructor(private readonly typeProductService:TypeProductService) {
  }


  @Post()
  @Permissions(PermConst.ADMIN)
  @UseGuards(JwtAuthGuards,PermissionGuard)
  async createTypeProduct(@Body() body: CreateTypeProductDto,@Request() req){
    try{
      const result = await this.typeProductService.createTypeProductAsync(body,req.user);
      return result;
    }catch (e) {
      throw e;
    }
  }
}