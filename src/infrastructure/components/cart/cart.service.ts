import { Injectable } from '@nestjs/common';
import { CartRepository } from '../../repositories/cart.repository';
import { CreateCartRequestDto } from './dto/create-cart-request.dto';
import { Claim } from '../../common/authentication/claims/claims';
import { CartReadModel } from '../../../core/entities/cart.entity';
import { DateTimeHelper, UuidHelper } from '../../common/helper';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateCartResponse } from './dto/create-cart-response';


@Injectable()
export class CartService {

  constructor(private readonly cartRepository: CartRepository , @InjectMapper() private readonly  mapper:Mapper) {
  }

  async createCartAsync(body: CreateCartRequestDto, user: Claim) {
    const cartReadModel = new CartReadModel();

    cartReadModel.color = body.color;
    cartReadModel.amount = body.amount;
    cartReadModel.size = body.size;
    cartReadModel.productId = body.productId;
    cartReadModel.userId = user.id;
    cartReadModel.id = UuidHelper.newUuid();
    cartReadModel.createdById = user.id;
    cartReadModel.createdByName = user.name;
    cartReadModel.createdDate = DateTimeHelper.getNowUnix();
    cartReadModel.modifiedById = user.id;
    cartReadModel.modifiedByName = user.name;
    cartReadModel.modifiedDate = DateTimeHelper.getNowUnix();

    const cart =  await  this.cartRepository.createCart(cartReadModel);

    return this.mapper.map(cart,CreateCartResponse,CartReadModel);
  }
}