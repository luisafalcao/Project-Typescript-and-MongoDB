/* eslint-disable no-unused-vars */
// DTO Data Tranfer object
import { UsuarioEntity } from '../../1entidades/usuarios.entity';

export type CriarUsuarioDTO = Omit<UsuarioEntity, 'id'>

export type AtualizarUsuarioDTO = Partial<CriarUsuarioDTO>


