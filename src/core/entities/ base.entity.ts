import {BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn} from "typeorm";
import { AutoMap } from '@automapper/classes';


export abstract class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @AutoMap()
  @Column()
  createdDate: number;
  @AutoMap()
  @Column()
  modifiedById: string;
  @AutoMap()
  @Column()
  modifiedDate: number;
  @AutoMap()
  @Column()
  modifiedByName: string;
  @AutoMap()
  @Column()
  createdByName: string;
  @AutoMap()
  @Column()
  createdById: string;


  /*@BeforeInsert()
  public setCreatedCreatedAndModifiedDate() {
      this.createdDate = DateTimeHelper.getNowUnix();
      this.modifiedDate = DateTimeHelper.getNowUnix();
  }

  @BeforeUpdate()
  public setModifiedDate() {
      this.modifiedDate = DateTimeHelper.getNowUnix();
  }*/
}