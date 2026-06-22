import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './core/response/transform.interceptor';
import { HttpExceptionFilter } from './core/response/http-exception.filter';
import { PastaModule } from './modules/pasta/pasta.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    origin: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        return new BadRequestException({
          code: 'FormValidationError',
          message: 'Form validation failed.',
          details: errors.map((e) => ({
            field: e.property,
            errors: Object.keys(e.constraints ?? {}),
          })),
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('syncpasta')
    .setDescription('syncpasta api docs')
    .setVersion('dev')
    .addApiKey(
      {
        in: 'header',
        type: 'apiKey',
        name: 'Authorization',
        description: 'ApiKey YOUR_API_KEY',
      },
      'ApiKey',
    )
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      include: [PastaModule],
    });
  SwaggerModule.setup('api/docs', app, documentFactory, {
    customCssUrl: '/swagger.css',
  });
  await app.listen(process.env.PORT ?? 80);
}

bootstrap()
  .then(() => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
    process.exit(1);
  });
