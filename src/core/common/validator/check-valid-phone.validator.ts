import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint()
@Injectable()
export class IsValidPhoneContains implements ValidatorConstraintInterface{
  constructor(private readonly userRepository:UserRepository) {
  }
  async validate(phone:string){
    const existUser = await this.userRepository.getUserByPhoneAsync(phone);
    if(existUser){
      return false;
    }
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "phone đã được sử dụng bởi 1 tài khoản khác"
  }
}


export function IsValidPhone(validationOption?: ValidationOptions){
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsValidPhoneContains,
    });
  };
}