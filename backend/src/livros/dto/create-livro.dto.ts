import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateLivroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsOptional()
  descricao: string;

  @IsString()
  localizacao_fisica: string;

  @IsDate()
  data_aquisicao: Date;

  @IsString()
  estado_conservacao: string;

  @IsString()
  autor: string;

  @IsString()
  uri_capa_livro: string;
}
