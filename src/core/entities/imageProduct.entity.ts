import { BaseEntity } from './ base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductReadModel } from './product.entity';

@Entity()
export class ImageProductReadModel extends BaseEntity{
  @Column()
  name:string;

  @Column()
  mimetype:string;

  @Column()
  productId:string;


  @ManyToOne(()=>ProductReadModel,(product)=>product.images)
  @JoinColumn({name:"productId"})
  product:ProductReadModel;
}