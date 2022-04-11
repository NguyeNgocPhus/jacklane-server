import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../../repositories/user.repository';
import { ConfigModule } from '../../common/services/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { IConfigService } from '../../../core/common/services/config.interface';
import { PassportModule } from '@nestjs/passport';
import { IPasswordService } from '../../../core/common/services/passoword.interface';
import { PasswordModule } from '../../common/services/password/password.module';


@Module({
  imports:[TypeOrmModule.forFeature([UserRepository]),PasswordModule,ConfigModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[IConfigService],
    useFactory:async(configService:IConfigService)=>({
      secret:configService.get('JWT_SECRET_KEY')
    })
  }),],
  controllers:[UserController],
  providers:[UserService],
  exports:[UserService],
})
export class UserModule{}