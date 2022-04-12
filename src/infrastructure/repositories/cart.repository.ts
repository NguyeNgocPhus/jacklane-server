

import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CartReadModel } from '../../core/entities/cart.entity';

@Injectable()
@EntityRepository(CartReadModel)
export class CartRepository extends Repository<CartReadModel>{
  constructor() {
    super();
  }
  async createCart(data:CartReadModel){
    return await this.save(data);
  }

}