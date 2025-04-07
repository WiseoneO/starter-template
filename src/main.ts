import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './helpers/globalExceptionFilter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { });
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors();
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter(configService));
  app.useGlobalInterceptors(new ResponseInterceptor());

   // setting up swagger documentation
   const config = new DocumentBuilder()
   .setTitle('SOLUTION API')
   .setDescription('Solution APIs documentation')
   .setVersion('1.0')
   .addTag('API')
   .build();
 const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  
  app.setBaseViewsDir(join(__dirname, '..', 'src/mail/templates'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || 3000);
  logger.log(`Application running on port: ${process.env.PORT || 3000}`);
}
bootstrap();
