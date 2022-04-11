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
export class IsValidEmailContains implements ValidatorConstraintInterface{
  constructor(private readonly userRepository:UserRepository) {
  }
  async validate(email:string){
    const existUser = await this.userRepository.getUserByEmailAsync(email);
    if(existUser){
      return false;
    }
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "email đã được sử dụng bởi 1 tài khoản khác"
  }
}


export function IsValidEmail(validationOption?: ValidationOptions){
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsValidEmailContains,
    });
  };
}