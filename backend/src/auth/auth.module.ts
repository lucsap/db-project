import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [UsuariosModule, PassportModule],
  providers: [AuthService, LocalStrategy, UsuariosService, LocalAuthGuard],
  exports: [AuthService],
})

export class AuthModule {}
