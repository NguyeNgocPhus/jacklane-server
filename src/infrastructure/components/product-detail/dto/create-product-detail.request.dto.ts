import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsValidProduct } from '../../../../core/common/validator/check-valid-product.validator';


export class CreateProductDetailRequestDto {
  @IsNotEmpty()
  @IsString()
  colorName:string;

  @IsNotEmpty()
  @IsString()
  colorCode:string

  @IsNotEmpty()
  @IsArray()
  size:string[];

  @IsNotEmpty()
  @IsNumber()
  amount:number;

  @IsNotEmpty()
  @IsString()
  @IsValidProduct()
  productId:string;
}