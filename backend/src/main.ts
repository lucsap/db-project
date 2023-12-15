import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // ou array ['http://site1.com', 'https://site2.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
});
  await app.listen(3001);

  useContainer(
    app.select(AppModule), { 
      fallbackOnErrors: true 
    }
  );
}

bootstrap();
