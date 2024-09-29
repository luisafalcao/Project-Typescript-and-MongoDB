import { inject, injectable } from "inversify";
import { CriarFilmeDTO } from "../dtos/filme.dto";
import FilmeServiceInterface from "../interfaces/servicos/filme-servico.interface";
import FilmeRepositorioInterface from "../interfaces/repositorios/filme-repositorio.interface";
import FilmeEntity from "../../1entidades/filmes.entity";
import "reflect-metadata";

@injectable()
class FilmeService implements FilmeServiceInterface {
    constructor(@inject('FilmeRepositorio') private filmeRepositorio: FilmeRepositorioInterface) {
        this.filmeRepositorio = filmeRepositorio;
    }

    public async buscarTodos(): Promise<(FilmeEntity | undefined)[]> {
        return await this.filmeRepositorio.buscarTodos();
    }

    public async criar(filme: CriarFilmeDTO): Promise<(FilmeEntity | undefined)[]> {
        await this.filmeRepositorio.criar(filme);
        return this.buscarTodos()
    }

    public async deletar(id: number): Promise<void> {
        return await this.filmeRepositorio.deletar(id);
    }
}

export default FilmeService;