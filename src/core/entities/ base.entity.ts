import {BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn} from "typeorm";


export abstract class BaseEntity {

  @Column()
  createdDate: number;
  @Column()
  modifiedById: string;
  @Column()
  modifiedDate: number;
  @Column()
  modifiedByName: string;
  @Column()
  createdByName: string;
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