import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLivroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  categoria: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  localizacao_fisica: string;

  @IsString()
  estado_conservacao: string;

  @IsString()
  autor: string;

  imagem_capa: string;
}
