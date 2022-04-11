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
  async createUserAsync(user:UserReadModel){

    return await this.save(user);
  }
  async getUserById(id:string){
    return await  this.findOne({id})
  }
  async getUserByEmailAsync(email:string){
    return await this.findOne({email})
  }
  async getUserByPhoneAsync(phone:string){
    return await this.findOne({phone})
  }

}