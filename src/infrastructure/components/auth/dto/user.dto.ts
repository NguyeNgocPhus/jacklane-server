import { IsEmail, IsString, ValidateIf, IsNotEmpty, IsDate } from 'class-validator';
import { Column } from 'typeorm';
import { IsVietnamesePhoneNumber } from '../../../../core/common/validator/is-viet-name-phone-number.validator';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsValidEmail } from '../../../../core/common/validator/check-valid-email.validator';
import { IsValidPhone } from '../../../../core/common/validator/check-valid-phone.validator';


export class UserDto{
  @AutoMap()
  id:string;

  @AutoMap()
  name:string;

  @AutoMap()
  email:string;


  @AutoMap()
  phone:string;

  @AutoMap()
  district!:null|string;

  @AutoMap()
  city!:null|string;

  @AutoMap()
  address!:null|string;

  @AutoMap()
  birthday!:null|Date;
  @AutoMap()
  roles:string[];

  @AutoMap()
  public modifiedByName: string;

  @AutoMap()
  public modifiedById: string;

  @AutoMap()
  public modifiedDate: number;

  @AutoMap()
  public createdByName: string;

  @AutoMap()
  public createdById: string;

  @AutoMap()
  public createdDate: number;


}