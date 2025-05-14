import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (process.env.NODE_ENV === 'development') {
    configureSwagger(app);
  }
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

/** Bootstrap Utils **/
function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Reebelo Case Study API')
    .setDescription('Development-only API docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
}
