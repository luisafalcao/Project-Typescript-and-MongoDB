import { inject, injectable } from "inversify";
import FilmeRepositorioInterface from "../../2dominio/interfaces/repositorios/filme-repositorio.interface";
import FilmeEntity from "../../1entidades/filmes.entity";
import mongoose from "mongoose";
import DBModel from "../database/db.model";
import NotFoundException from "../../2dominio/exceptions/mongo-db.exception";
import { CriarFilmeDTO } from "../../2dominio/dtos/filme.dto";

@injectable()
class FilmeRepositorio implements FilmeRepositorioInterface {
    private filmeModel: mongoose.Model<FilmeEntity>

    constructor(
        @inject('DBModel') dbModel: DBModel
    ) {
        this.filmeModel = dbModel.filmeModel
    }

    async buscarTodos(): Promise<(FilmeEntity | undefined)[]> {
        return await this.filmeModel.find()
    }

    async criar(filme: CriarFilmeDTO): Promise<void> {
        const filmeMaiorId = await this.filmeModel.find().sort({ id: -1 }).limit(1);
        const newId = filmeMaiorId ? filmeMaiorId[0].id : 0

        const film = new this.filmeModel({
            id: newId + 1,
            titulo: filme.titulo,
            elenco: filme.elenco,
            diretor: filme.diretor,
        });

        await film.save();
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
