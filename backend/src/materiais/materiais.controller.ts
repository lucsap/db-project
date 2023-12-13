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
export class MateriaisController {
  constructor(private readonly materiaisService: MateriaisService) {}

  @Post('cadastro')
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materiaisService.create(createMaterialDto);
  }

  @Get()
  findAll() {
    return this.materiaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiaisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: CreateMaterialDto) {
    return this.materiaisService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiaisService.remove(+id);
  }
}
