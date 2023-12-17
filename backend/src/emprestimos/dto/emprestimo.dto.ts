import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EmprestimoDto { 
  @IsNumber()
  @IsNotEmpty()
  id_item: number;

  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;

  @IsNotEmpty()
  @IsString()
  tipo_item: string;

  @IsString()
  @IsOptional()
  data_devolucao_prevista: Date;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
