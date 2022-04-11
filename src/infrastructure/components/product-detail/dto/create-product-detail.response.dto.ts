import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsValidProduct } from '../../../../core/common/validator/check-valid-product.validator';
import { AutoMap } from '@automapper/classes';


export class CreateProductDetailResponseDto {
  @AutoMap()
  colorName:string;

  @AutoMap()
  colorCode:string

  @AutoMap()
  size:string[];

  @AutoMap()
  amount:number;

  @AutoMap()
  productId:string;

  @AutoMap()
  public modifiedByName: string;

  @AutoMap()
  public modifiedById: string;

  @AutoMap()
  public modifiedDate: number;

  @AutoMap()
  public createdByName: string;

  @AutoMap()
  public createdById: string;

  @AutoMap()
  public createdDate: number;
}