import { BaseEntity } from './ base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { ProductReadModel } from './product.entity';

@Entity()
export class TypeProductReadModel  extends  BaseEntity{
    @AutoMap()
    @Column()
    name:string;

    @AutoMap()
    @Column()
    type:string;

    @AutoMap()
    @Column()
    code:string;

    @OneToMany(()=>ProductReadModel,(product)=>product.typeProduct)
    products:ProductReadModel[]


}