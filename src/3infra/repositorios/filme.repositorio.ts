import { inject, injectable } from "inversify";
import FilmeRepositorioInterface from "../../2dominio/interfaces/repositorios/filme-repositorio.interface";
import FilmeEntity from "../../1entidades/filmes.entity";
import mongoose from "mongoose";
import DBModel from "../database/db.model";
import NotFoundException from "../../2dominio/exceptions/mongo-db.exception";
import { AtualizarFilmeDTO, CriarFilmeDTO } from "../../2dominio/dtos/filme.dto";
import { UsuarioEntity } from "../../1entidades/usuarios.entity";
import { AtualizarUsuarioDTO } from "../../2dominio/dtos/usuario.dto";

@injectable()
class FilmeRepositorio implements FilmeRepositorioInterface {
    private filmeModel: mongoose.Model<FilmeEntity>
    private userModel: mongoose.Model<UsuarioEntity>

    constructor(
        @inject('DBModel') dbModel: DBModel
    ) {
        this.filmeModel = dbModel.filmeModel
        this.userModel = dbModel.userModel
    }

    async adicionarElenco(userId: string, movieData: FilmeEntity): Promise<FilmeEntity | undefined> {
        const usuario = await this.userModel.findById(userId)

        if (usuario) {
            usuario.filmes.push(movieData);
            await usuario.save();

            return await this.filmeModel.findOneAndUpdate(
                { titulo: movieData.titulo },
                { $addToSet: { elenco: userId } },
                { upsert: true }
            ) ?? undefined
        }
        return undefined
    }

    async buscarTodos(): Promise<(FilmeEntity | undefined)[]> {
        return await this.filmeModel.find().populate('elenco')
    }

    async criar(filme: CriarFilmeDTO): Promise<void> {
        const filmeMaiorId = await this.filmeModel.find().sort({ id: -1 }).limit(1);
        const newId = filmeMaiorId ? filmeMaiorId[0].id : 0

        const film = new this.filmeModel({
            id: newId + 1,
            titulo: filme.titulo,
            elenco: filme.elenco,
            diretor: filme.diretor,
            ano: filme.ano
        });

        await film.save();
    }

    async atualizar(id: string, dadosNovos: AtualizarFilmeDTO): Promise<void> {
        await this.filmeModel.findOneAndUpdate({ _id: id }, dadosNovos, { new: true })
    }

    async deletar(id: number): Promise<(void)> {
        const resultado = await this.filmeModel.deleteOne({ id })
        if (resultado) {
            return
        }

        throw new NotFoundException("Filme não encontrado")
    }
}

export default FilmeRepositorio;
