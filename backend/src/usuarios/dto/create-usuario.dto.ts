export class CreateUsuarioDto {
  nome: string;
  sobrenome: string;
  email: string;
  uri_foto?: Buffer;
  senha: string;
  role: string;
}
