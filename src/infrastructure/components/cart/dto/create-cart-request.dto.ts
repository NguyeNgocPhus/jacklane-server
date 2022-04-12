import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsValidProduct } from '../../../../core/common/validator/check-valid-product.validator';


export class CreateCartRequestDto {
  @IsString()
  @IsNotEmpty()
  color: string;
  @IsNumber()
  @IsNotEmpty()
  amount:number;
  @IsString()
  @IsNotEmpty()
  size:string;
  @IsNotEmpty()
  @IsString()
  @IsValidProduct()
  productId:string;
}