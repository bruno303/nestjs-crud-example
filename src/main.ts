import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSequelize } from './infra/persistence/sequelize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  configureSequelize()
  await app.listen(3000)
}
bootstrap();
