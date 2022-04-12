import { AutomapperModule, AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper, MappingProfile, mapWithArguments } from '@automapper/core';
import { TypeProductReadModel } from '../../core/entities/typeproduct.entity';
import { CreateTypeProductResponse } from '../components/type-product/dto/create-typeproduct.response';
import { CreateProductResponseDto } from '../components/product/dto/create-product.response.dto';
import { ProductReadModel } from '../../core/entities/product.entity';
import { CartReadModel } from '../../core/entities/cart.entity';
import { CreateCartResponse } from '../components/cart/dto/create-cart-response';



export class CartMapper extends AutomapperProfile{
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile():MappingProfile {
    return mapper =>{
      mapper.createMap(CartReadModel,CreateCartResponse);

    }
  }
}