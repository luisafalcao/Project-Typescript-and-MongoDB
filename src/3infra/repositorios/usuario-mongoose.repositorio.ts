import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { UsuarioEntity } from '../../1entidades/usuarios.entity';
import { injectable } from 'inversify';
import UsuarioRepositorioInterface from '../../2dominio/interfaces/repositorios/usuario-repositorio.interface';
import "reflect-metadata";
import dotenv from 'dotenv';
import { UserModel } from '../usuario.schema';
import { connectToDatabase } from '../database/mongoose.config';

dotenv.config();

@injectable()
class UsuarioRepositorio implements UsuarioRepositorioInterface {
  constructor() { connectToDatabase() }
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
    const usuarioMaiorId = await UserModel.find().sort({ id: -1 }).limit(1);
    const user = new UsuarioEntity(
      (usuarioMaiorId[0].id + 1),
      usuario.nome,
      usuario.ativo
    )

    const userModel = new UserModel(user)
    await userModel.save();
  }

  async atualizar(id: string, dadosNovos: AtualizarUsuarioDTO): Promise<void> {
    await UserModel.findOneAndUpdate({ _id: id }, dadosNovos, { new: true })
  }

  async deletar(id: number): Promise<boolean> {
    const resultado = await UserModel.deleteOne({ id })
    return resultado.deletedCount > 0;
  }
}

export default UsuarioRepositorio;
