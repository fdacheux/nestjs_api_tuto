import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('BookmarkApi')
    .setDescription('Nestjs Bookmark tuto project API')
    .setVersion('1.0')
    .addTag('bookmark')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // setupSwagger(app);

  await app.listen(process.env.PORT ?? 3333);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
