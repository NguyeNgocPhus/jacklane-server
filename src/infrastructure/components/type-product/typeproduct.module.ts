import { Module } from '@nestjs/common';
import { TypeProductController } from './typeproduct.controller';
import { TypeProductService } from './typeproduct.service';
import { PasswordModule } from '../../common/services/password/password.module';
import { ConfigModule } from '../../common/services/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { IConfigService } from '../../../core/common/services/config.interface';
import { UserModule } from '../auth/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../repositories/user.repository';
import { TypeProductRepository } from '../../repositories/type-product.repository';


@Module({
  imports:[TypeOrmModule.forFeature([TypeProductRepository]),PasswordModule,ConfigModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[IConfigService],
    useFactory:async(configService:IConfigService)=>({
      secret:configService.get('JWT_SECRET_KEY')
    })
  }),UserModule],
  controllers:[TypeProductController],
  providers:[TypeProductService],
  exports:[]
})
export class TypeProductModule {

}