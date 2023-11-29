import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Knex } from 'nestjs-knex';

@Injectable()
export class AuthService {
  constructor (private readonly knex: Knex) {}

  async signIn (email: string, senha: string) {
    const usuario = await this.knex.raw(`
      SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `);

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return usuario;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
