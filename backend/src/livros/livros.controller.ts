import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('cadastro')
  create(
    @Body() createLivroDto: CreateLivroDto,
    @Req() req: any,
  ) {
    return this.livrosService.create(createLivroDto, req);
  }

  @Get()
  findAll() {
    return this.livrosService.findAll();
  }

  @Get(':isbn')
  findOne(@Param('isbn') isbn: string) {
    return this.livrosService.findOne(+isbn);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':isbn')
  update(@Param('isbn') isbn: string, 
         @Body() updateLivroDto: CreateLivroDto,
         @Req() req: any
        ) {
    return this.livrosService.update(+isbn, updateLivroDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':isbn')
  remove(
    @Param('isbn') isbn: string,
    @Req() req: any,
  ) {
    return this.livrosService.remove(+isbn, req);
  }
}
