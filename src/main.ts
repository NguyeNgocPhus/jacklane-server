import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './infrastructure/common/services/config/config.service';
import { ValidationPipe } from '@nestjs/common';
const configService = new ConfigService();



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000,()=>{
    console.log("Application is listening on port: ",configService.get("PORT"));
  });
}
bootstrap();
