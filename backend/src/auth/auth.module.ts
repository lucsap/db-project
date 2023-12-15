import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsuariosModule, 
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuariosService, JwtStrategy, LocalStrategy],
})

export class AuthModule {}
