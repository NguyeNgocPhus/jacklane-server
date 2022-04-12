import { BaseEntity } from './ base.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { UserReadModel } from './user.entity';
import { ProductReadModel } from './product.entity';
import { AutoMap } from '@automapper/classes';


@Entity()
export class CartReadModel extends BaseEntity{
  @AutoMap()
  @Column()
  color:string;
  @AutoMap()
  @Column()
  size:string;
  @AutoMap()
  @Column()
  amount:number;
  @AutoMap()
  @Column()
  productId:string;

  @AutoMap()
  @Column()
  userId:string;


  @ManyToOne(()=>UserReadModel,(user)=>user.carts)
  @JoinColumn({name:'userId'})
  user:UserReadModel;


  @ManyToOne(()=>ProductReadModel,(product)=>product.carts)
  @JoinColumn({name:'productId'})
  product:ProductReadModel;
}