import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { UsuarioEntity } from '../../1entidades/usuarios.entity';
import { injectable } from 'inversify';
import UsuarioRepositorioInterface from '../../2dominio/interfaces/repositorios/usuario-repositorio.interface';
import "reflect-metadata";
import dotenv from 'dotenv';
import { connectToDatabase } from '../database/mongoose.config';
import { UserModel } from '../usuario.schema';

dotenv.config();

@injectable()
class UsuarioRepositorio implements UsuarioRepositorioInterface {

  constructor() {
    connectToDatabase()
  }
  async buscarTodos(): Promise<(UsuarioEntity | undefined)[]> {
    return await UserModel.find()
  }
  async buscaPorId(id: number): Promise<UsuarioEntity | undefined> {
    const usuario = await UserModel.findOne({ id })
    if (usuario) {
      return usuario
    }
    return undefined
  }
  async criar(usuario: CriarUsuarioDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async atualizar(id: string, dadosNovos: AtualizarUsuarioDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async deletar(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default UsuarioRepositorio;
