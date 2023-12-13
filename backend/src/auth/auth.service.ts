import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService as jwt } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private users: UsuariosService,
    private jwt: jwt,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const usuario = await this.users.findByEmail(email);

    if (usuario) {
      const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

      if (isPasswordValid) {
        return {
          ...usuario,
          senha: undefined,
        }
      }
    }

    throw new UnauthorizedException (
      'Usuário ou senha inválidos',
    );

  }

  async login(user: any): Promise<any> {
    const payload = {
      email: user.email,
      sub: user.id,
    }

    return { 
      access_token: this.jwt.sign(payload, { secret: process.env.JWT_SECRET }),
    };
  }
}
