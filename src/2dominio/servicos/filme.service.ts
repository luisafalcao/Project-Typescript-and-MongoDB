import { inject, injectable } from "inversify";
import { AtualizarFilmeDTO, CriarFilmeDTO } from "../dtos/filme.dto";
import FilmeServiceInterface from "../interfaces/servicos/filme-servico.interface";
import FilmeRepositorioInterface from "../interfaces/repositorios/filme-repositorio.interface";
import FilmeEntity from "../../1entidades/filmes.entity";
import NotFoundException from "../exceptions/mongo-db.exception";
import "reflect-metadata";

@injectable()
class FilmeService implements FilmeServiceInterface {
    private readonly filmeRepositorio: FilmeRepositorioInterface;
    constructor(@inject('FilmeRepositorio') filmeRepositorio: FilmeRepositorioInterface) {
        this.filmeRepositorio = filmeRepositorio;
    }

    async adicionarElenco(userId: string, movieData: FilmeEntity): Promise<FilmeEntity> {
        const filme = await this.filmeRepositorio.adicionarElenco(userId, movieData)

        if (!filme) throw new NotFoundException("Usuário ou filme não encontrado")
        return filme
    }

    public async buscarTodos(): Promise<(FilmeEntity | undefined)[]> {
        return await this.filmeRepositorio.buscarTodos();
    }

    public async criar(filme: CriarFilmeDTO): Promise<(FilmeEntity | undefined)[]> {
        await this.filmeRepositorio.criar(filme);
        return this.buscarTodos()
    }

    public async atualizar(id: string, filme: AtualizarFilmeDTO): Promise<void> {
        await this.filmeRepositorio.atualizar(id, filme);
    }

    public async deletar(id: number): Promise<void> {
        return await this.filmeRepositorio.deletar(id);
    }
}

export default FilmeService;