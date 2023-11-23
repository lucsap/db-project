export class itemDto {
  nome: string;
  descricao: string;
  categoria: string;
  estado_conservacao: string;
  localizacao_fisica: string;
  data_aquisicao: Date;
}

export class livroDto {
  ibsm: number;
  autor: string;
  uri_foto: string;
  item: itemDto;
}

export class materiaisDidaticosDto {
  id: number;
  uri_foto: string;
  numero_serie: number;
  item: itemDto;
}
