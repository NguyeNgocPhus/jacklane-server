import { IsEmail, IsString, ValidateIf, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { Column } from 'typeorm';
import { IsVietnamesePhoneNumber } from '../../../../core/common/validator/is-viet-name-phone-number.validator';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsValidEmail } from '../../../../core/common/validator/check-valid-email.validator';
import { IsValidPhone } from '../../../../core/common/validator/check-valid-phone.validator';


export class CreateUserDto{
  @AutoMap()
  @IsString()
  name:string;

  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  @IsValidEmail()
  email:string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  password:string

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @IsValidPhone()
  @IsVietnamesePhoneNumber({message:"nhap dung so dien thoai viet nam"})
  phone:string;

  @AutoMap()
  @ValidateIf((object, value) => value !== null)
  @IsString()
  district!:null|string;

  @AutoMap()
  @ValidateIf((object, value) => value !== null)
  @IsString()
  city!:null|string;

  @AutoMap()
  @ValidateIf((object, value) => value !== null)
  @IsString()
  address!:null|string;

  @AutoMap()
  @ValidateIf((object, value) => value !== null)
  @IsDate()
  @Type(()=>Date)
  birthday!:null|Date;

  @AutoMap()
  @IsArray()
  roles:string[];
}