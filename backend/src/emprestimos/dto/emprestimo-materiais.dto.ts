import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class EmprestimoMateriaisDto {
  @IsNumber()
  @IsNotEmpty()
  id_item: number;

  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;

  @IsNotEmpty()
  @IsDate()
  data_devolucao_prevista: Date;

  @IsNotEmpty()
  @IsBoolean()
  status_devolucao: boolean;
}
