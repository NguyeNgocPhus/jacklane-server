import { BaseEntity } from './ base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserReadModel{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string;

  @Column()
  email:string;
}