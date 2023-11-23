import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Knex } from 'knex';
import {
  itemDto,
  livroDto,
  materiaisDidaticosDto,
} from './dto/create-itens.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ItensService {
  constructor(private readonly knex: Knex) {}

  async createLivro(
    livroData: livroDto,
    itemData: itemDto,
    imagemCapa?: Express.Multer.File,
  ): Promise<any> {
    if (!itemData.nome) {
      throw new BadRequestException('Título não informado');
    }
    if (!livroData.autor) {
      throw new BadRequestException('Autor não informado');
    }

    const itemQuery = `
    INSERT INTO itens (nome, descricao, categoria)
    VALUES (?, ?, ?)
    RETURNING id
  `;

    const livroQuery = `
    INSERT INTO Livros (autor, uri_foto, item_id)
    VALUES (?, ?, ?)
  `;

    const itemValues = [
      itemData.nome,
      itemData.descricao || '',
      itemData.categoria || '',
    ];

    const [itemId] = await this.knex.raw(itemQuery, itemValues);
    let livroValues = [livroData.autor, null, itemId];
    if (imagemCapa) {
      const caminhoDestino = path.join(
        __dirname,
        '../../uploads',
        imagemCapa.originalname,
      );

      fs.writeFileSync(caminhoDestino, imagemCapa.buffer); //salva a imagem no servidor
      const imagemBuffer = fs.readFileSync(caminhoDestino); //converte a imagem para um buffer e insere na tabela de usuario
      livroValues[1] = imagemBuffer;
      fs.unlinkSync(caminhoDestino); //deleta a imagem do servidor
    }
    const resultadoLivro = await this.knex.raw(livroQuery, livroValues);
    if (resultadoLivro) {
      return { success: true };
    } else {
      throw new InternalServerErrorException(`Falha ao criar livro`);
    }
  }

  async createMateriaisDidaticos(materiaisData: materiaisDidaticosDto, itemData: itemDto; imagemCapa?: Express.Multer.File): Promise<any> {
    if (!itemData.nome) {
      throw new BadRequestException('Título não informado');
    }
    if (!materiaisData.numero_serie) {
      throw new BadRequestException('Número de série não informado');
    }

    const itemQuery = `
    INSERT INTO itens (nome, descricao, categoria)
    VALUES (?, ?, ?)
    RETURNING id
  `;

   const materiaisQuery = `
    INSERT INTO materiaisDidaticos (uri_foto, numero_serie, item_id)
    VALUES (?, ?, ?)
   `
    const itemValues = [
      itemData.nome,
      itemData.descricao || '',
      itemData.categoria || '',
    ];

    const [itemId] = await this.knex.raw(itemQuery, itemValues);
    let materiaisValues = [null, materiaisData.numero_serie, itemId];
    if (imagemCapa) {
      const caminhoDestino = path.join(
        __dirname,
        '../../uploads',
        imagemCapa.originalname,
      );

      fs.writeFileSync(caminhoDestino, imagemCapa.buffer); //salva a imagem no servidor
      const imagemBuffer = fs.readFileSync(caminhoDestino); //converte a imagem para um buffer e insere na tabela de usuario
      materiaisValues[0] = imagemBuffer;
      fs.unlinkSync(caminhoDestino); //deleta a imagem do servidor
    }
    const resultadoMateriais = await this.knex.raw(materiaisQuery, materiaisValues);
    if (resultadoMateriais) {
      return { success: true };
    } else {
      throw new InternalServerErrorException(`Falha ao criar materiais didáticos`);
    }
  };

  async findAllItems(): Promise<any[]> {
    const query = `
    SELECT * FROM itens`;
    const result = await this.knex.raw(query);
    return result.rows;
  }
}
