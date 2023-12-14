import { IsDateString, IsNumber, IsString } from 'class-validator';

export class EmprestimoEntity {
  @IsNumber()
  id_item: number;

  @IsNumber()
  id_usuario: number;

  @IsDateString()
  data_emprestimo: string;

  @IsDateString()
  data_devolucao: string;

  @IsString()
  status: string;
}
