import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        version: '5.7',
        connection: {
          host: 'localhost',
          user: 'postgres',
          port: 5432,
          password: 'postgres',
          database: 'db',
        },
      },
    }),
  ],
})

export class AppModule {}
