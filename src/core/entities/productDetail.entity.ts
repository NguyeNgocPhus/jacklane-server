import { BaseEntity } from './ base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductReadModel } from './product.entity';
import { AutoMap } from '@automapper/classes';
import { ImageProductReadModel } from './imageProduct.entity';

@Entity()
export class ProductDetailReadModel extends BaseEntity {
  @AutoMap()
  @Column({
    unique:true
  })
  colorName:string;
  @AutoMap()
  @Column({
    unique:true
  })
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

  @ManyToOne(()=>ProductReadModel,(product)=>product.productDetails,{onDelete:'CASCADE'})
  @JoinColumn({name:"productId"})
  product:ProductReadModel;

  @OneToMany(() => ImageProductReadModel, (image) => image.productDetail ,{cascade:true})
  images: ImageProductReadModel[];
}