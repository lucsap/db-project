import { IsNumber, IsString } from "class-validator";

export class CreateMaterialDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  categoria: string;

  @IsString()
  estado_conservacao: string;

  @IsString()
  localizacao_fisica: string;

  @IsString()
  uri_foto: string;

  @IsNumber()
  numero_serie: number;
}
