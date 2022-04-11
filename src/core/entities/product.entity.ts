import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './ base.entity';
import { TypeProductReadModel } from './typeproduct.entity';
import { ImageProductReadModel } from './imageProduct.entity';
import { ProductDetailReadModel } from './productDetail.entity';
import { CartReadModel } from './cart.entity';
import { AutoMap } from '@automapper/classes';


@Entity()
export class ProductReadModel extends BaseEntity {
  @Column({
    unique: true,
  })
  name: string;
  @AutoMap()
  @Column({
    unique: true,
  })
  code: string;

  @AutoMap()
  @Column({
    unique: true,
  })
  normalizedName: string;
  @AutoMap()
  @Column()
  price: number;
  @AutoMap()
  @Column({
    default: 0,
  })
  rating: number;
  @AutoMap()
  @Column()
  typeProductId: string;


  @ManyToOne(() => TypeProductReadModel, (typeProduct) => typeProduct.products)
  @JoinColumn({ name: 'typeProductId' })
  typeProduct: TypeProductReadModel;

  @OneToMany(() => ImageProductReadModel, (image) => image.product)
  images: ImageProductReadModel[];

  @OneToMany(() => ProductDetailReadModel, (productDetail) => productDetail.product)
  productDetails: ProductDetailReadModel[];

  @OneToMany(() => CartReadModel, (cart) => cart.product)
  carts: CartReadModel[];
}
