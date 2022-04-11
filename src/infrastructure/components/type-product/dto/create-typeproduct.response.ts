import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeProductEnum } from '../../../../core/common/enum/type-product.enum';
import { AutoMap } from '@automapper/classes';


export class CreateTypeProductResponse {
  @AutoMap()
  name:string;
  @AutoMap()
  normalizedName: string;
  @AutoMap()
  code:string;
  @AutoMap()
  type:string;

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