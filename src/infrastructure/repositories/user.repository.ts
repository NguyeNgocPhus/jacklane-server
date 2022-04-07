import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserReadModel } from '../../core/entities/user.entity';
import { CreateUserDto } from '../components/auth/dto/create-user.dto';


@Injectable()
@EntityRepository(UserReadModel)
export class UserRepository extends Repository<UserReadModel>{
  constructor() {
    super()
  }
  async createUserAsync(user:CreateUserDto){

    return await this.save(user);
  }
  async getUserById(id:string){
    return await  this.find({id})
  }

}