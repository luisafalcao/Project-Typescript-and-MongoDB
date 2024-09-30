import FilmeEntity from "../../../1entidades/filmes.entity";
import { CriarFilmeDTO } from "../../dtos/filme.dto";
import { AtualizarUsuarioDTO } from "../../dtos/usuario.dto";

interface FilmeRepositorioInterface {
    buscarTodos(): Promise<(FilmeEntity | undefined)[]>
    criar(filme: CriarFilmeDTO): Promise<(void)>
    atualizar(id: string, dadosNovos: AtualizarUsuarioDTO): Promise<(void)>
    deletar(id: number): Promise<(void)>
    adicionarElenco(userId: string, movieData: FilmeEntity): Promise<FilmeEntity | undefined>
}

export default FilmeRepositorioInterface