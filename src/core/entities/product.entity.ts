import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './ base.entity';
import { TypeProductReadModel } from './typeproduct.entity';
import { ImageProductReadModel } from './imageProduct.entity';
import { ProductDetailReadModel } from './productDetail.entity';


@Entity()
export class ProductReadModel extends BaseEntity{
  @Column()
  name:string;

  @Column()
  code:string;


  @Column()
  price:number;


  @Column()
  typeProductId:string;


  @ManyToOne(() => TypeProductReadModel, (typeProduct)=>typeProduct.products)
  @JoinColumn({name:"typeProductId"})
  typeProduct:TypeProductReadModel;

  @OneToMany(()=>ImageProductReadModel,(image)=>image.product)
  images:ImageProductReadModel[];

  @OneToMany(()=>ProductDetailReadModel,(productDetail) => productDetail.product)
  productDetails: ProductDetailReadModel[];
}
