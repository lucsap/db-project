import { PartialType } from '@nestjs/mapped-types';
import { EmprestimoLivrosDto } from './emprestimo-livros.dto';

export class UpdateEmprestimoLivrosDto extends PartialType(EmprestimoLivrosDto) {}
