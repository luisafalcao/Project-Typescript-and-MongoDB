import { UsuarioSchemaDriver as UsuarioSchema } from '../database/schemas/usuario.schema';
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { UsuarioEntity } from '../../1entidades/usuarios.entity';
import { injectable } from 'inversify';
import UsuarioRepositorioInterface from '../../2dominio/interfaces/repositorios/usuario-repositorio.interface';
import "reflect-metadata";
import dotenv from 'dotenv';
import { Collection, MongoClient, ObjectId, ServerApiVersion, WithId } from 'mongodb';
import MongoDBException from '../../2dominio/exceptions/not-found.exception';
import ContatoVO from '../../1entidades/vo/contato.vo';

dotenv.config();

@injectable()
class UsuarioRepositorio implements UsuarioRepositorioInterface {
  private readonly mongoKey = process.env.MONGO_DB_KEY ?? '';
  private readonly DBName = process.env.MONGO_DB_NAME ?? '';
  private readonly collectionName = 'users';

  constructor() { }

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

  public async buscarTodos(): Promise<(UsuarioEntity | undefined)[]> {
    const { collection, client } = await this.getCollection()
    try {
      const users = await collection.find({}).toArray()
      return users.map(usuarioSchema => this.schemaParser(usuarioSchema));
    } catch (e) {
      throw new MongoDBException('Conexão ao MongoDB falhou.');
    } finally {
      await client.close()
    }
  }

  public async buscaPorId(id: number): Promise<UsuarioEntity | undefined> {
    const { collection, client } = await this.getCollection();
    try {
      const usuarioschema = await collection.findOne({ id: id });

      return this.schemaParser(usuarioschema)
    } finally {
      await client.close()
    }
  }

  public async buscaPorIdMongo(id: string): Promise<UsuarioSchema | null> {
    const { collection, client } = await this.getCollection();
    try {
      const usuario = await collection.findOne({ _id: new ObjectId(id) });
      return usuario;
    } finally {
      await client.close()
    }
  }

  public async criar(usuario: CriarUsuarioDTO): Promise<void> {
    const { collection, client } = await this.getCollection();

    try {
      const usuarioMaiorId = await collection.find({}).sort({ id: -1 }).limit(1).toArray();

      const novoUsuario: UsuarioSchema = {
        _id: new ObjectId(),
        id: usuarioMaiorId[0].id + 1,
        nome: usuario.nome,
        ativo: usuario.ativo,
      };

      await collection.insertOne(novoUsuario);
    } finally {
      await client.close();
    }
  }

  public async atualizar(id: string, dadosNovos: AtualizarUsuarioDTO): Promise<void> {
    const { collection, client } = await this.getCollection();

    try {
      const atualizacao = {
        $set: {
          ...(dadosNovos.nome && { nome: dadosNovos.nome }),
          ...(dadosNovos.ativo !== undefined && { ativo: dadosNovos.ativo }),
        }
      }

      await collection.updateOne({ _id: new ObjectId(id) }, atualizacao)
    } finally {
      await client.close();
    }
  }

  public async atualizarPeloIdNumber(id: number, dadosNovos: AtualizarUsuarioDTO): Promise<void> {
    const { collection, client } = await this.getCollection();

    try {
      const atualizacao = {
        $set: {
          ...(dadosNovos.nome && { nome: dadosNovos.nome }),
          ...(dadosNovos.ativo !== undefined && { ativo: dadosNovos.ativo }),
        }
      }

      await collection.updateOne({ id }, atualizacao)
    } finally {
      await client.close();
    }
  }

  public async deletar(id: number): Promise<boolean> {
    const { collection, client } = await this.getCollection();
    try {
      const resultado = await collection.deleteOne({ id: id })
      return resultado.deletedCount > 0
    } finally {
      await client.close()
    }
  }

  //convertendo do padrão do mongodb
  private schemaParser(usuarioschema: WithId<UsuarioSchema> | null): UsuarioEntity | undefined {
    if (usuarioschema) {
      const usuario = new UsuarioEntity(
        usuarioschema?.id ?? 0,
        usuarioschema?.nome ?? "",
        usuarioschema?.ativo ?? false,
        {} as ContatoVO,
        usuarioschema?._id.toString() ?? ""
      )
      return usuario;
    }
    return undefined
  }
}

export default UsuarioRepositorio;
