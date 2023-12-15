import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLivroDto {
  titulo: string;
  categoria: string;
  descricao: string;
  localizacao_fisica: string;

  @IsString()
  estado_conservacao: string;

  @IsDate()
  data_aquisicao: Date;

  @IsString()
  autor: string;
  uri_capa_livro: string;
}
