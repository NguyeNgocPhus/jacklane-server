import { Column } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsValidTypeProduct } from '../../../../core/common/validator/check-valid-typeProduct.validator';


export class CreateProductRequestDto {
  @IsNotEmpty()
  @IsString()
  name:string;

  @IsNotEmpty()
  @IsString()
  code:string;

  @IsNotEmpty()
  price:number;

  @IsNotEmpty()
  @IsString()
  @IsValidTypeProduct()
  typeProductId:string;
}