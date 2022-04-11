import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { TypeProductRepository } from '../../../infrastructure/repositories/type-product.repository';

@ValidatorConstraint()
@Injectable()
export class IsValidTypeProductContains implements ValidatorConstraintInterface{
  constructor(private readonly typeProductRepository:TypeProductRepository) {
  }
  async validate(typeProductId:string){
    const exist = await this.typeProductRepository.getTypeProductById(typeProductId);
    if(!exist){
      return false;
    }
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "khong ton tai this type poduct"
  }
}


export function IsValidTypeProduct(validationOption?: ValidationOptions){
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsValidTypeProductContains,
    });
  };
}