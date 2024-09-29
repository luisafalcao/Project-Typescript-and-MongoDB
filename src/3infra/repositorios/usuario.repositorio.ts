import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { UsuarioEntity } from '../../1entidades/usuarios.entity';
import { inject, injectable } from 'inversify';
import UsuarioRepositorioInterface from '../../2dominio/interfaces/repositorios/usuario-repositorio.interface';
import "reflect-metadata";
import dotenv from 'dotenv';
import DBModel from '../database/db.model';
import mongoose from 'mongoose';

dotenv.config();

@injectable()
class UsuarioRepositorio implements UsuarioRepositorioInterface {
  private userModel: mongoose.Model<UsuarioEntity>

  constructor(
    @inject('DBModel') dbModel: DBModel
  ) {
    this.userModel = dbModel.userModel
  }

  async buscarTodos(): Promise<(UsuarioEntity | undefined)[]> {
    return await this.userModel.find()
  }

  async buscaPorId(id: number): Promise<UsuarioEntity | undefined> {
    const usuario = await this.userModel.findOne({ id })
    if (usuario) {
      return usuario
    }
    return undefined
  }

  async criar(usuario: CriarUsuarioDTO): Promise<void> {
    const usuarioMaiorId = await this.userModel.find().sort({ id: -1 }).limit(1);
    const newId = usuarioMaiorId ? usuarioMaiorId[0].id : 0

    const user = new UsuarioEntity(
      (newId + 1),
      usuario.nome,
      usuario.ativo,
      usuario.contato
    )

    console.log("user: ", user)
    const userModel = new this.userModel(user)
    await userModel.save();
  }

  async atualizar(id: string, dadosNovos: AtualizarUsuarioDTO): Promise<void> {
    await this.userModel.findOneAndUpdate({ _id: id }, dadosNovos, { new: true })
  }

  async deletar(id: number): Promise<boolean> {
    const resultado = await this.userModel.deleteOne({ id })
    return resultado.deletedCount > 0;
  }
}

export default UsuarioRepositorio;
