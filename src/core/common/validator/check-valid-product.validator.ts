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
import { ProductRepository } from '../../../infrastructure/repositories/product.repository';

@ValidatorConstraint()
@Injectable()
export class IsValidProductContains implements ValidatorConstraintInterface{
  constructor(private readonly productRepository:ProductRepository) {
  }
  async validate(productId:string){
    const exist = await this.productRepository.getProductById(productId);
    if(!exist){
      return false;
    }
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "khong ton tai this  product"
  }
}


export function IsValidProduct(validationOption?: ValidationOptions){
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsValidProductContains,
    });
  };
}