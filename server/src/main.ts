import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('syncpasta')
    .setDescription('syncpasta api docs')
    .setVersion('dev')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
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
