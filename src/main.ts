import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const options = new DocumentBuilder()
  .setTitle('Api - lista de mercado')
  .addBearerAuth()
  .setDescription('App web para lista de mercado')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  app.enableCors();
  app.use(helmet());

  await app.listen(3000);
  logger.log(`Server is runnirng in ${ await app.getUrl()}`);
}
bootstrap();
