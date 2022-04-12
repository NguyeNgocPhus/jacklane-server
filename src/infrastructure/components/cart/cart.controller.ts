import { Body, Controller, Post, UseGuards, Request, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { Permissions } from '../../common/authorization/decorator/permission.decorator';
import { PermConst } from '../../common/constants/perm.contants';
import { JwtAuthGuards } from '../../common/authentication/guards/jwt.auth.guards';
import { PermissionGuard } from '../../common/authorization/guards/permission.guards';
import { CreateCartRequestDto } from './dto/create-cart-request.dto';



@Controller('/cart')
export class CartController {
  constructor(private readonly cartService:CartService) {
  }


  @Post()
  @Permissions(PermConst.ADMIN)
  @UseGuards(JwtAuthGuards,PermissionGuard)
  async createCart (@Body() body:CreateCartRequestDto,@Request() req) {
    try {
      const result = await this.cartService.createCartAsync(body,req.user);
      return result;
    }catch (e) {
      throw  e;
    }
  }

}