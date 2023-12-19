import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // isso vai remover qualquer propriedade que não esteja no DTO
    forbidNonWhitelisted: true, // isso vai retornar um erro caso uma propriedade não esteja no DTO
    transform: true, // isso vai transformar os dados para o tipo especificado no DTO
  })
  )

  useContainer(
    app.select(AppModule), { 
      fallbackOnErrors: true 
    }
  );

  const config = new DocumentBuilder() 
    .setTitle('Emprestimos API')
    .setDescription('A Api de emprestimo de livros e materiais')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
