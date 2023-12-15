import { PartialType } from '@nestjs/mapped-types';
import { EmprestimoLivrosDto } from './emprestimo-livros.dto';

export class UpdateEmprestimoDto extends PartialType(EmprestimoLivrosDto) {}
