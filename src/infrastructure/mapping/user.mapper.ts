import { AutomapperModule, AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { UserReadModel } from '../../core/entities/user.entity';
import { UserDto } from '../components/auth/dto/user.dto';


export class UserMapper extends AutomapperProfile{
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile():MappingProfile {
    return mapper =>{
      mapper.createMap(UserReadModel,UserDto)
        .forMember(d=>d.name,mapFrom(s=>s.name));
    }
  }
}