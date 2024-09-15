/* eslint-disable no-unused-vars */
export class UsuarioModel {
  id: number;
  nome: string;
  ativo: boolean;

  constructor (
    id: number,
    nome: string,
    ativo: boolean
  ) {
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
  }
}
