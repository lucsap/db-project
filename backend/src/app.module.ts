import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivrosController } from './livros/livros.controller';
import { MateriaisController } from './materiais/materiais.controller';
import { MateriaisModule } from './materiais/materiais.module';
import { LivrosModule } from './livros/livros.module';
import { LivrosService } from './livros/livros.service';
import { MateriaisService } from './materiais/materiais.service';

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
    MateriaisModule,
    LivrosModule,
  ],
  controllers: [AppController, LivrosController, MateriaisController],
  providers: [AppService,LivrosService, MateriaisService],
})
export class AppModule {}
