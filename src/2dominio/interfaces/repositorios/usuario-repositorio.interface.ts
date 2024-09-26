import { UsuarioSchema } from "../../../3infra/usuario.schema";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../../dtos/usuario.dto";

interface UsuarioRepositorioInterface {

  buscarTodos(): Promise<UsuarioSchema[]>;

  buscaPorId(id: number): Promise<UsuarioSchema | null>;

  criar(usuario: CriarUsuarioDTO): Promise<void>;

  atualizar(id: string, dadosNovos: AtualizarUsuarioDTO): Promise<void>;

  deletar(id: number): Promise<void>;
}

export default UsuarioRepositorioInterface;