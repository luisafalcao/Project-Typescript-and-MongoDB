import ContatoVO from "./vo/contato.vo";

/* eslint-disable no-unused-vars */
export class UsuarioEntity {
  _id?: string;
  id: number;
  nome: string;
  ativo?: boolean;
  contato?: ContatoVO

  constructor(
    id: number,
    nome: string,
    ativo?: boolean,
    contato?: ContatoVO,
    _id?: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
    this._id = _id;
    this.contato = contato
  }
}
