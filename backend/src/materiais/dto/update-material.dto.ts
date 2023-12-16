import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialDto } from './create-material.dto';

export class UpdateUsuarioDto extends PartialType(CreateMaterialDto) { }
