import path from 'path';
import fs from 'fs';
import DBSchema from '../db.schema';
import { UsuarioSchema as UsuarioSchema } from '../usuario.schema';
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { UsuarioModel } from '../../1entidades/usuarios.entity';
import { injectable } from 'inversify';
import UsuarioRepositorioInterface from '../../2dominio/interfaces/repositorios/usuario-repositorio.interface';
import "reflect-metadata";

@injectable()
class UsuarioRepositorio implements UsuarioRepositorioInterface {
  private readonly caminhoArquivo: string;

  constructor () {
    this.caminhoArquivo = path.join(__dirname, 'fakeDB.json');
  }

  private acessoBD (): DBSchema {
    const bdPuro = fs.readFileSync(this.caminhoArquivo, 'utf-8');
    return JSON.parse(bdPuro);
  }

  private reescreverUsuariosNoArquivo (usuarios: Array<UsuarioSchema>):boolean {
    const bd = this.acessoBD();
    bd.users = usuarios;
    try {
      fs.writeFileSync(this.caminhoArquivo, JSON.stringify(bd));
      return true;
    } catch {
      return false;
    }
  }

  public buscaTodos (): UsuarioSchema[] {
    const bd = this.acessoBD();
    return bd.users;
  }

  public buscaPorId (id: number): UsuarioSchema | undefined {
    const bd = this.acessoBD();
    const usuario = bd.users.find((usuario) => usuario.id === id);
    return usuario;
  }

  public criar (usario: CriarUsuarioDTO) {
    const usuarios = this.buscaTodos();

    const usarioMaiorId = usuarios.reduce(
      (max, usario) => usario.id > max.id ? usario : max, usuarios[0]
    );

    const novoUsuario = new UsuarioModel(
      usarioMaiorId.id + 1,
      usario.nome,
      usario.ativo
    );
    usuarios.push(novoUsuario);
    this.reescreverUsuariosNoArquivo(usuarios);
  }

  public atualizar (id:number, dadosNovos: AtualizarUsuarioDTO) {
    const usuarios = this.buscaTodos();
    const posicaoUsuario = usuarios.findIndex(usuario => usuario.id === id);
    if (posicaoUsuario !== -1) {
      if (dadosNovos.nome) {
        usuarios[posicaoUsuario].nome = dadosNovos.nome;
      }
      if (dadosNovos.ativo !== undefined) {
        usuarios[posicaoUsuario].ativo = dadosNovos.ativo;
      }
      this.reescreverUsuariosNoArquivo(usuarios);
    }
  }

  public deletar (id: number) {
    const usuarios = this.buscaTodos();
    const posicaoUsuario = usuarios.findIndex(usuario => usuario.id === id);
    if (posicaoUsuario !== -1) {
      usuarios.splice(posicaoUsuario, 1);
      this.reescreverUsuariosNoArquivo(usuarios);
    }
  }
}

export default UsuarioRepositorio;
