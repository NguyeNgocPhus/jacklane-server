import { AutomapperModule, AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper, MappingProfile, mapWithArguments } from '@automapper/core';
import { TypeProductReadModel } from '../../core/entities/typeproduct.entity';
import { CreateTypeProductResponse } from '../components/type-product/dto/create-typeproduct.response';



export class TypeProductMapper extends AutomapperProfile{
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile():MappingProfile {
    return mapper =>{
        mapper.createMap(TypeProductReadModel,CreateTypeProductResponse);

    }
  }
}