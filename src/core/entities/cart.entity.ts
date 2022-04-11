import { BaseEntity } from './ base.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { UserReadModel } from './user.entity';
import { ProductReadModel } from './product.entity';


@Entity()
export class CartReadModel extends BaseEntity{
  @Column()
  color:string;

  @Column()
  size:string;

  @Column()
  amount:string;

  @Column()
  productId:string;

  @Column()
  userId:string;


  @ManyToOne(()=>UserReadModel,(user)=>user.carts)
  @JoinColumn({name:'userId'})
  user:UserReadModel;


  @ManyToOne(()=>ProductReadModel,(product)=>product.carts)
  @JoinColumn({name:'productId'})
  product:ProductReadModel;
}