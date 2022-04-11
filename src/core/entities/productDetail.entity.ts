import { BaseEntity } from './ base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductReadModel } from './product.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class ProductDetailReadModel extends BaseEntity {
  @AutoMap()
  @Column()
  colorName:string;
  @AutoMap()
  @Column()
  colorCode:string;
  @AutoMap()
  @Column("varchar", { array: true })
  size:string[];
  @AutoMap()
  @Column()
  amount:number;
  @AutoMap()
  @Column()
  productId:string;

  @ManyToOne(()=>ProductReadModel,(product)=>product.productDetails)
  @JoinColumn({name:"productId"})
  product:ProductReadModel;
}