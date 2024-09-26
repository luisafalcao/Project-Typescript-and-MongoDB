import path from 'path';
import fs from 'fs';
import DBSchema from '../db.schema';
import { UsuarioSchema as UsuarioSchema } from '../usuario.schema';
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { UsuarioModel } from '../../1entidades/usuarios.entity';
import { injectable } from 'inversify';
import UsuarioRepositorioInterface from '../../2dominio/interfaces/repositorios/usuario-repositorio.interface';
import "reflect-metadata";
import dotenv from 'dotenv';
import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import MongoDBException from '../../2dominio/exceptions/not-found.exception';

dotenv.config();

const mongoKey = process.env.MONGO_DB_KEY;

@injectable()
class UsuarioRepositorio implements UsuarioRepositorioInterface {
  private readonly caminhoArquivo: string;
  private readonly mongoKey = process.env.MONGO_DB_KEY ?? '';
  private readonly DBName = process.env.MONGO_DB_NAME ?? '';
  private readonly collectionName = 'users';

  constructor() {
    this.caminhoArquivo = path.join(__dirname, 'fakeDB.json');
  }

  private async getCollection(): Promise<{
    collection: Collection<UsuarioSchema>,
    client: MongoClient
  }> {
    const client = new MongoClient(this.mongoKey,
      {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true
        }
      }
    )
    await client.connect();
    const db = client.db(this.DBName)
    const collection = db.collection<UsuarioSchema>(this.collectionName)

    return { collection, client }
  }

  private acessoBD(): DBSchema {
    const bdPuro = fs.readFileSync(this.caminhoArquivo, 'utf-8');
    return JSON.parse(bdPuro);
  }

  private reescreverUsuariosNoArquivo(usuarios: Array<UsuarioSchema>): boolean {
    const bd = this.acessoBD();
    bd.users = usuarios;
    try {
      fs.writeFileSync(this.caminhoArquivo, JSON.stringify(bd));
      return true;
    } catch {
      return false;
    }
  }

  public async buscarTodos(): Promise<UsuarioSchema[]> {
    const { collection, client } = await this.getCollection()
    try {
      const users = await collection.find({}).toArray()
      return users;
    } catch (e) {
      throw new MongoDBException('Conexão ao MongoDB falhou.');
    } finally {
      client.close()
    }
  }

  public buscaTodos(): UsuarioSchema[] {
    const bd = this.acessoBD();
    return bd.users;
  }

  public buscaPorId(id: number): UsuarioSchema | undefined {
    const bd = this.acessoBD();
    const usuario = bd.users.find((usuario) => usuario.id === id);
    return usuario;
  }

  public criar(usario: CriarUsuarioDTO) {
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

  public atualizar(id: number, dadosNovos: AtualizarUsuarioDTO) {
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

  public deletar(id: number) {
    const usuarios = this.buscaTodos();
    const posicaoUsuario = usuarios.findIndex(usuario => usuario.id === id);
    if (posicaoUsuario !== -1) {
      usuarios.splice(posicaoUsuario, 1);
      this.reescreverUsuariosNoArquivo(usuarios);
    }
  }
}

export default UsuarioRepositorio;
