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
        migrations: ['dist/database/*.js'],
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

  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...AutoMapppers,
  ],
})
export class AppModule {
}
