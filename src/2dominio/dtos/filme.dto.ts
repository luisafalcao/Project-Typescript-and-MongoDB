/* eslint-disable no-unused-vars */
// DTO Data Tranfer object
import FilmeEntity from "../../1entidades/filmes.entity"

export type CriarFilmeDTO = Omit<FilmeEntity, 'id'>

export type AtualizarFilmeDTO = Partial<CriarFilmeDTO>


