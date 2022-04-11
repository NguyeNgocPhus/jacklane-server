import { AutomapperModule, AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper, MappingProfile, mapWithArguments } from '@automapper/core';
import { ProductDetailReadModel } from '../../core/entities/productDetail.entity';
import { CreateProductDetailResponseDto } from '../components/product-detail/dto/create-product-detail.response.dto';



export class ProductDetailMapper extends AutomapperProfile{
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile():MappingProfile {
    return mapper =>{
      mapper.createMap(ProductDetailReadModel,CreateProductDetailResponseDto);

    }
  }
}