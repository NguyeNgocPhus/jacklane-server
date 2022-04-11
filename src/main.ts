import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './infrastructure/common/services/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
const configService = new ConfigService();



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(configService.get('PORT'),()=>{
    console.log("Application is listening on port: ",configService.get("PORT"));
  });
}
bootstrap();
