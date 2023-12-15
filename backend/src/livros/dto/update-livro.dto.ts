import { PartialType } from "@nestjs/mapped-types";
import { CreateLivroDto } from "./create-livro.dto";

export class updateLivroDto extends PartialType(CreateLivroDto) {}
