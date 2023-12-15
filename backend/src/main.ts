import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);

  useContainer(
    app.select(AppModule), { 
      fallbackOnErrors: true 
    }
  );
}

bootstrap();
