import { PickType } from '@nestjs/mapped-types';
import { Usuarios } from '../../usuarios/entities/usuarios.entity';

export class JwtPayloadDto extends PickType(Usuarios, [
  'id',
  'email',
  'nome',
  'role_id',
]) {}
