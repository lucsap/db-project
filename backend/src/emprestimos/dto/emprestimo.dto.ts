import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

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

  @IsNotEmpty()
  @IsDate()
  data_devolucao_prevista: Date;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
