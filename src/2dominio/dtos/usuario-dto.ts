/* eslint-disable no-unused-vars */
// DTO Data Tranfer object
import { UsuarioModel } from '../../1entidades/usuarios';

export type CriarUsuarioDTO = Omit<UsuarioModel, 'id' >

export type AtualizarUsuarioDTO = Partial<CriarUsuarioDTO>


