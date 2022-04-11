import { BaseEntity } from './ base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class UserReadModel extends BaseEntity{

  @AutoMap()
  @Column()
  name:string;
  @AutoMap()
  @Column({
    unique:true
  })
  email:string;
  @AutoMap()
  @Column()
  password:string;

  @AutoMap()
  @Column({
    nullable:true
  })
  birthday?:Date|null;

  @AutoMap()
  @Column({
    unique:true
  })
  phone:string;
  @AutoMap()
  @Column({
    nullable:true
  })
  district:string;
  @AutoMap()
  @Column({
    nullable:true
  })
  city:string;
  @AutoMap()
  @Column({
    nullable:true
  })
  address:string;

  @AutoMap()
  @Column("varchar", { array: true ,nullable:true})
  permissions:string[];
}