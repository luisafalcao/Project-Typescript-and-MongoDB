import FilmeEntity from "../../../1entidades/filmes.entity";
import { CriarFilmeDTO } from "../../dtos/filme.dto";

interface FilmeServiceInterface {
    buscarTodos(): Promise<(FilmeEntity | undefined)[]>;
    criar(filme: CriarFilmeDTO): Promise<(FilmeEntity | undefined)[]>;
    deletar(id: number): Promise<void>;
    adicionarElenco(userId: string, movieData: FilmeEntity): Promise<FilmeEntity | undefined>
}

export default FilmeServiceInterface;