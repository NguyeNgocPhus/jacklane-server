import { IPasswordService } from '../../../../core/common/services/passoword.interface';
import *  as bcrypt from "bcrypt";
import { Injectable } from '@nestjs/common';


@Injectable()
export class PasswordService implements IPasswordService{
  async hashPassword(password:string){
      return await  bcrypt.hash(password,10)
  }
  async verifyHashPassword(password:string,hashPassword:string){
    const result =  await bcrypt.compare(password,hashPassword);
    return result;
  }
}