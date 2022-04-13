import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeProductEnum } from '../../../../core/common/enum/type-product.enum';
import { AutoMap } from '@automapper/classes';


export class CreateTypeProductResponse {
  @AutoMap()
  id:string;
  @AutoMap()
  name:string;
  @AutoMap()
  normalizedName: string;
  @AutoMap()
  code:string;
  @AutoMap()
  nameSlug:string;
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