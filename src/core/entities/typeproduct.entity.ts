import { BaseEntity } from './ base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { ProductReadModel } from './product.entity';
import { TypeProductEnum } from '../common/enum/type-product.enum';

@Entity()
export class TypeProductReadModel  extends  BaseEntity{
    @AutoMap()
    @Column({
        unique:true
    })
    name:string;

    @AutoMap()
    @Column({
        type:'enum',
        enum:TypeProductEnum,
    })
    type:TypeProductEnum;

    @AutoMap()
    @Column({
        unique:true
    })
    normalizedName: string;

    @AutoMap()
    @Column({
        unique:true,
        nullable:true
    })
    nameSlug:string;

    @AutoMap()
    @Column({
        unique:true,
    })
    code:string;

    @OneToMany(()=>ProductReadModel,(product)=>product.typeProduct ,{cascade:true})
    products:ProductReadModel[]


}