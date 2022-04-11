import { Module } from '@nestjs/common';
import { IPasswordService } from '../../../../core/common/services/passoword.interface';
import { PasswordService } from './password.service';


@Module({
  imports:[],
  providers:[{
    provide:IPasswordService,
    useClass:PasswordService,
  }],
  exports:[IPasswordService]
})
export class PasswordModule{}