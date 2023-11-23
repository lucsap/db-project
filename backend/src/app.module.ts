import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItensModule } from './itens/itens.module';
import { LivrosModule } from './livros/livros.module';
import { MateriaisDidaticosModule } from './materiais-didaticos/materiais-didaticos.module';

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
    ItensModule,
    LivrosModule,
    MateriaisDidaticosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
