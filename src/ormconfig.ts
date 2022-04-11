import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {ConfigService} from "./infrastructure/common/services/config/config.service";


export const configService = new ConfigService();
export const pgConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: configService.get("DB_HOST"),
  port: Number(configService.get("DB_PORT") || 0),
  username: configService.get("DB_USER"),
  password: configService.get("DB_PASSWORD"),
  database: configService.get("DB_DATABASE"),
  entities: ["dist/core/entities/**/*.entity.{ts,js,d.ts}"],
  migrations: ['dist/database/migrations/*.ts'],
  migrationsTableName: 'migration',
  synchronize:false,
  cli: {
    migrationsDir: 'dist/database/migrations',
  },
  logging: "all",
  maxQueryExecutionTime: 1000,//log all queries which run more then 1 second.
  logger: "advanced-console",
};

export default pgConfig;
