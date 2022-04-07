import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserDto } from './dto/user.dto';
import { UserReadModel } from '../../../core/entities/user.entity';


@Injectable()
export class UserService{
  constructor(private readonly userRepository: UserRepository,@InjectMapper() private mapper:Mapper) {
  }

  async createUser(body:CreateUserDto){
    const user =  await  this.userRepository.createUserAsync(body);
    return this.mapper.map(user,UserDto,UserReadModel);

  }
  async getUserById(id:string){
    return this.userRepository.getUserById(id);
  }

}