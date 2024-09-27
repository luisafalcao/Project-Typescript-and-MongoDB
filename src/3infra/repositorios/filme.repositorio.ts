import { inject, injectable } from "inversify";
import FilmeRepositorioInterface from "../../2dominio/interfaces/repositorios/filme-repositorio.interface";
import FilmeEntity from "../../1entidades/filmes.entity";
import mongoose from "mongoose";
import DBModel from "../database/db.model";
import NotFoundException from "../../2dominio/exceptions/mongo-db.exception";

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

    async criar(filme: FilmeEntity): Promise<(FilmeEntity)> {
        const filmeModel = new this.filmeModel(filme)
        return await filmeModel.save()
    }

    async deletar(_id: string): Promise<(void)> {
        const resultado = await this.filmeModel.deleteOne({ _id })
        if (resultado) {
            return
        }

        throw new NotFoundException("Filme não encontrado")
    }
}

export default FilmeRepositorio;
