import { BaseEntity } from './ base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductReadModel } from './product.entity';

@Entity()
export class ProductDetailReadModel extends BaseEntity {
  @Column()
  color:string;

  @Column("varchar", { array: true })
  size:string[];

  @Column()
  amount:number

  @Column()
  productId:string;

  @ManyToOne(()=>ProductReadModel,(product)=>product.productDetails)
  @JoinColumn({name:"productId"})
  product:ProductReadModel;
}