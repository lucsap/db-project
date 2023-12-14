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
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { EmprestimosModule } from './emprestimos/emprestimos.module';

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
    AuthModule,
    JwtModule,
    EmprestimosModule
  ],
  controllers: [AppController, LivrosController, MateriaisController, AuthController],
  providers: [AppService, LivrosService, MateriaisService, AuthService, LocalStrategy],
})
export class AppModule {}
