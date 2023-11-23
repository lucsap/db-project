import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItensModule } from './itens/itens.module';

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
    ItensModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
