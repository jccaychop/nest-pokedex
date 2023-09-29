import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');

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
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT);
  console.log(`App running on port ${PORT}`);
}
bootstrap();

/*
 * Versioning
 * https://docs.nestjs.com/techniques/versioning
 */

/*
 * La data que se recibe por los query parameters, con el decorador @Query, por defecto, todos son de tipo string
 * ejemplo: http://localhost:3000/api/v2/pokemon?limit=10
 * en nuestro DTO, limit es de tipo number, pero se recibe como string a traves del @Query
 *
 * Para que se transforme automaticamente a tipo number y pueda pasar la validacion de nuestro DTO,
 * vamos a realizar la conversion en nuestro useGlobalPipes
 
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
 */
