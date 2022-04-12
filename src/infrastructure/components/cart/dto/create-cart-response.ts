import { IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';


export class CreateCartResponse {
  @AutoMap()
  color: string;
  @AutoMap()
  amount:number;
  @AutoMap()
  size:string;
  @AutoMap()
  productId:string;
  @AutoMap()
  userId:string;
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