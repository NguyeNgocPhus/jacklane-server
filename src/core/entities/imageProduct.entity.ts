import { BaseEntity } from './ base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductReadModel } from './product.entity';
import { ProductDetailReadModel } from './productDetail.entity';

@Entity()
export class ImageProductReadModel extends BaseEntity{
  @Column()
  name:string;

  @Column()
  mimetype:string;

  @Column()
  productDetailId:string;


  @ManyToOne(()=>ProductDetailReadModel,(productDetail)=>productDetail.images,{onDelete:'CASCADE'})
  @JoinColumn({name:"productId"})
  productDetail:ProductDetailReadModel;
}