import FilmeEntity from "../../../1entidades/filmes.entity";
import { AtualizarFilmeDTO, CriarFilmeDTO } from "../../dtos/filme.dto";

interface FilmeServiceInterface {
    buscarTodos(): Promise<(FilmeEntity | undefined)[]>;
    criar(usuario: CriarFilmeDTO): Promise<(FilmeEntity | undefined)[]>;
    deletar(id: string): Promise<void>;
}

export default FilmeServiceInterface;