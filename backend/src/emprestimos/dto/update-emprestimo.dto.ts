import { PartialType } from '@nestjs/mapped-types';
import { CreateEmprestimoDto } from './create-emprestimo.dto';

export class UpdateEmprestimoDto extends PartialType(CreateEmprestimoDto) {}
