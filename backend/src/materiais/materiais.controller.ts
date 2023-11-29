import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { MateriaisService } from './materiais.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Controller('materiais')
export class MateriaisController {}
