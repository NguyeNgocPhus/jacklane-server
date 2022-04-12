import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from '../../repositories/cart.repository';




@Module({
  imports:[TypeOrmModule.forFeature([CartRepository])],
  controllers:[CartController],
  providers:[CartService],
  exports:[]
})
export class CartModule {

}