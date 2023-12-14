export class CreateLivroDto {
  titulo: string;
  categoria: string;
  descricao: string;
  localizacao_fisica: string;
  data_aquisicao: Date;
  estado_conservacao: string;
  autor: string;
  uri_capa_livro: string;
}
