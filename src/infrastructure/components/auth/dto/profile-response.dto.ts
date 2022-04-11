import { IsEmail, IsString, ValidateIf, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { AutoMap } from '@automapper/classes';



export class ProfileResponseDto{
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
  permissions:string[];
}