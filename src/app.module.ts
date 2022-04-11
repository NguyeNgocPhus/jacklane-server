import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './infrastructure/common/services/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IConfigService } from './core/common/services/config.interface';
import { Repository } from 'typeorm';
import { Repositories } from './infrastructure/repositories';
import { UserModule } from './infrastructure/components/auth/user.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AutoMapppers } from './infrastructure/mapping';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationModule } from './infrastructure/common/authentication/authentication.module';
import { IsValidEmailContains } from './core/common/validator/check-valid-email.validator';
import { IsValidPhoneContains } from './core/common/validator/check-valid-phone.validator';
import { PassportModule } from '@nestjs/passport';
import { PasswordModule } from './infrastructure/common/services/password/password.module';
import { ProductModule } from './infrastructure/components/product/product.module';
import { ProductImageModule } from './infrastructure/components/product-image/productImage.module';
import { ProductDetailModule } from './infrastructure/components/product-detail/productDetail.module';
import { TypeProductModule } from './infrastructure/components/type-product/typeproduct.module';


@Module({
  imports: [
    AuthenticationModule,
    AutomapperModule.forRoot({
      options: [{ name: 'APP_MAPPER', pluginInitializer: classes }],
      singular: true,
    }),
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[IConfigService],
        useFactory:async(configService:IConfigService)=>({
            secret:configService.get('JWT_SECRET_KEY')
        })
    }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [IConfigService],
      useFactory: async (configService: IConfigService) => ({
        type: 'postgres' as 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT') || 0),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/core/entities/**/*.entity.{ts,js,d.ts}'],
        migrations: ['dist/database/migrations/*.js'],
        autoLoadEntities: true,
        synchronize: false,
        migrationsTableName: 'migration',
        cli: {
          migrationsDir: 'dist/database/migrations',
        },
        logging: 'all',
        maxQueryExecutionTime: 1000,//log all queries which run more then 1 second.
      }),
    }),
    TypeOrmModule.forFeature([...Repositories]),
    UserModule,
    ProductModule,
    ProductImageModule,
    ProductDetailModule,
    TypeProductModule,
    PasswordModule

  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...AutoMapppers,
    IsValidEmailContains,
    IsValidPhoneContains
  ],
})
export class AppModule {
}
