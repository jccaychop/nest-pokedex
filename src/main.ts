import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* ejemplo: localhost:3000/api/
  app.setGlobalPrefix('api');

  //* ejemplo: localhost:3000/api/v2/
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '2',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();

/*
 * Versioning
 * https://docs.nestjs.com/techniques/versioning
 */
