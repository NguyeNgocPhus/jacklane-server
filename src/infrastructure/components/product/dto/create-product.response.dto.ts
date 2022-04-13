import { AutoMap } from '@automapper/classes';


export class CreateProductResponseDto {
  @AutoMap()
  id:string;
  @AutoMap()
  name:string;

  @AutoMap()
  code:string;

  @AutoMap()
  normalizedName: string;
  @AutoMap()
  nameSlug: string;
  @AutoMap()
  price:number;

  @AutoMap()
  typeProductId:string;
  @AutoMap()
  rating:string;

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