import { CreateMaterialDto } from './dto/create-material.dto';
import * as fs from 'fs';
import * as path from 'path';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MateriaisService {
  constructor(@InjectConnection() private readonly knex: Knex) {
    this.knex = knex;
  }

  async create(
    createMaterialDto: CreateMaterialDto,
    imagemMaterial?: Express.Multer.File,
  ) {
    if (!createMaterialDto.nome) {
      throw new BadRequestException('Nome não informado');
    }
    if (!createMaterialDto.categoria) {
      throw new BadRequestException('Categoria não informada');
    }
    if (!createMaterialDto.descricao) {
      throw new BadRequestException('Descrição não informada');
    }
    if (!createMaterialDto.localizacao_fisica) {
      throw new BadRequestException('Localização física não informada');
    }
    if (!createMaterialDto.estado_conservacao) {
      throw new BadRequestException('Estado de conservação não informado');
    }

    let material = {
      nome: createMaterialDto.nome,
      categoria: createMaterialDto.categoria,
      descricao: createMaterialDto.descricao,
      localizacao_fisica: createMaterialDto.localizacao_fisica,
      estado_conservacao: createMaterialDto.estado_conservacao,
      numero_serie: createMaterialDto.numero_serie,
      uri_foto_material: null,
    };
    if (imagemMaterial) {
      const caminhoDestino = path.join(
        __dirname,
        '../../uploads',
        imagemMaterial.originalname,
      );
      fs.writeFileSync(caminhoDestino, imagemMaterial.buffer);
      const imagemBuffer = fs.readFileSync(caminhoDestino);
      material.uri_foto_material = imagemBuffer.toString('base64');
    }
    const resultado = await this.knex.raw(`
    INSERT INTO MateriaisDidaticos (nome, categoria, descricao, localizacao_fisica, estado_conservacao, numero_serie, uri_foto_material) 
    VALUES ('${material.nome}', '${material.categoria}', '${material.descricao}', '${material.localizacao_fisica}', '${material.estado_conservacao}', '${material.numero_serie}','${material.uri_foto_material}')`);

    const setItem = await this.knex.raw(`INSERT INTO Itens("id_material_didatico", "tipo_item")
    SELECT id, 'material_didatico' FROM MateriaisDidaticos WHERE id = ${resultado.rows[0].id}`);

    if (resultado) {
      return {
        success: true,
        message: 'Material didático cadastrado com sucesso!',
        setItem: setItem,
      };
    } else {
      throw new InternalServerErrorException(
        'Erro ao cadastrar material didático',
      );
    }
  }

  async findAll() {
    const materiais = await this.knex.raw(`SELECT * FROM MateriaisDidaticos`);
    return materiais.rows;
  }

  async findOne(id: number) {
    const material = await this.knex.raw(
      `SELECT * FROM MateriaisDidaticos WHERE id = ${id}`,
    );
    if (material.rows.length === 0) {
      throw new NotFoundException('Material didático não encontrado');
    }
    return material.rows[0];
  }

  async update(
    id: number,
    updateMaterialDto: UpdateMaterialDto,
    imagemMaterial?: Express.Multer.File,
  ) {
    const updateFields = {};
    if (updateMaterialDto.nome) {
      updateFields['nome'] = updateMaterialDto.nome;
    }
    if (updateMaterialDto.categoria) {
      updateFields['categoria'] = updateMaterialDto.categoria;
    }
    if (updateMaterialDto.descricao) {
      updateFields['descricao'] = updateMaterialDto.descricao;
    }
    if (updateMaterialDto.localizacao_fisica) {
      updateFields['localizacao_fisica'] = updateMaterialDto.localizacao_fisica;
    }
    if (updateMaterialDto.estado_conservacao) {
      updateFields['estado_conservacao'] =
        updateMaterialDto.estado_conservacao;
    }
    if (updateMaterialDto.numero_serie) {
      updateFields['numero_serie'] = updateMaterialDto.numero_serie;
    }
    if (imagemMaterial) {
      const caminhoDestino = path.join(
        __dirname,
        '../../uploads',
        imagemMaterial.originalname,
      );
      fs.writeFileSync(caminhoDestino, imagemMaterial.buffer);
      const imagemBuffer = fs.readFileSync(caminhoDestino);
      updateFields['uri_foto_material'] = imagemBuffer.toString('base64');
    }
    const resultado = await this.knex.raw(
      `UPDATE MateriaisDidaticos SET ${Object.keys(updateFields)[0]} = '${
        Object.values(updateFields)[0]
      }' WHERE id = ${id}`,
    );
    if (resultado) {
      return {
        success: true,
        message: 'Material didático atualizado com sucesso!',
      };
    } else {
      throw new InternalServerErrorException('Erro ao atualizar material');
    }
  }

  async remove(id: number) {
    const resultado = await this.knex.raw(
      `DELETE FROM MateriaisDidaticos WHERE id = ${id}`,
    );
    if (resultado) {
      return {
        success: true,
        message: 'Material didático removido com sucesso!',
      };
    }
  }
}
