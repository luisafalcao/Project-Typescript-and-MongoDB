import FilmeEntity from "../../../1entidades/filmes.entity";
import { AtualizarFilmeDTO, CriarFilmeDTO } from "../../dtos/filme.dto";

interface FilmeServiceInterface {
    buscarTodos(): Promise<(FilmeEntity | undefined)[]>;
    criar(filme: CriarFilmeDTO): Promise<(FilmeEntity | undefined)[]>;
    deletar(id: number): Promise<void>;
}

export default FilmeServiceInterface;