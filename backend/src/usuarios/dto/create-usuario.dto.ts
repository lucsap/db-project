import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  sobrenome: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
