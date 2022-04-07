import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../services/config/config.module';
import { UserModule } from '../../components/auth/user.module';


@Module({
  imports:[PassportModule,ConfigModule,UserModule],
  providers:[JwtStrategy]
})
export class AuthenticationModule{}