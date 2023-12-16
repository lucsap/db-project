import { PartialType } from '@nestjs/mapped-types';
import { EmprestimoDto } from './emprestimo.dto';

export class UpdateEmprestimoDto extends PartialType(EmprestimoDto) {}
