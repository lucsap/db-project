import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
