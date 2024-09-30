import FilmeEntity from "../../../1entidades/filmes.entity";
import { CriarFilmeDTO } from "../../dtos/filme.dto";

interface FilmeRepositorioInterface {
    buscarTodos(): Promise<(FilmeEntity | undefined)[]>
    criar(filme: CriarFilmeDTO): Promise<(void)>
    deletar(id: number): Promise<(void)>
    adicionarElenco(userId: string, movieData: FilmeEntity): Promise<FilmeEntity | undefined>
}

export default FilmeRepositorioInterface