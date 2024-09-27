import FilmeEntity from "../../../1entidades/filmes.entity";
import { CriarFilmeDTO } from "../../dtos/filme.dto";

interface FilmeRepositorioInterface {
    buscarTodos(): Promise<(FilmeEntity | undefined)[]>
    criar(filme: CriarFilmeDTO): Promise<(FilmeEntity)>
    deletar(id: string): Promise<(void)>
}

export default FilmeRepositorioInterface