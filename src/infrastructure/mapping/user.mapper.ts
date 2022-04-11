import { AutomapperModule, AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { mapFrom, Mapper, MappingProfile, mapWithArguments } from '@automapper/core';
import { UserReadModel } from '../../core/entities/user.entity';
import { UserDto } from '../components/auth/dto/user.dto';
import { CreateUserDto } from '../components/auth/dto/create-user.dto';
import { currentUserResolver } from './current-user';
import { ProfileResponseDto } from '../components/auth/dto/profile-response.dto';


export class UserMapper extends AutomapperProfile{
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile():MappingProfile {
    return mapper =>{
      mapper.createMap(UserReadModel,UserDto)
        .forMember((d)=>d.birthday,mapFrom((s)=>s.birthday ? s.birthday : null))
        // .forMember(d=>d.name,mapFrom(s=>s.name));
      mapper.createMap(CreateUserDto,UserReadModel)
        .forMember((d)=>d.birthday,mapFrom((s)=>s.birthday ? s.birthday : null))
        // .forMember((d)=>d.createdById,mapWithArguments(currentUserResolver))
      mapper.createMap(UserReadModel,ProfileResponseDto)
        .forMember((d)=>d.birthday,mapFrom((s)=>s.birthday ? s.birthday : null))

    }
  }
}