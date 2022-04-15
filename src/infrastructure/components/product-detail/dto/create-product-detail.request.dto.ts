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
  size:string;

  @IsNotEmpty()
  amount:string;

  @IsNotEmpty()
  @IsString()
  @IsValidProduct()
  productId:string;
}