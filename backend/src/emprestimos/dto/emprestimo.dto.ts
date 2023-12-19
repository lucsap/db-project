import { IsNotEmpty, IsNumber } from "class-validator";

export class EmprestimoDto { 
  @IsNumber()
  @IsNotEmpty()
  id_item: number;

  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;
}
