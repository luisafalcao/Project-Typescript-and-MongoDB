/* eslint-disable no-unused-vars */
export class UsuarioEntity {
  _id?: string;
  id: number;
  nome: string;
  ativo: boolean;

  constructor(
    id: number,
    nome: string,
    ativo: boolean,
    _id?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
    this._id = _id
  }
}
