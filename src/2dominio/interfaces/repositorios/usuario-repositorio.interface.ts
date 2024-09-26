import { UsuarioSchema } from "../../../3infra/usuario.schema";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../../dtos/usuario.dto";

interface UsuarioRepositorioInterface {

  buscarTodos(): Promise<UsuarioSchema[]>;

  buscaTodos(): UsuarioSchema[];

  buscaPorId(id: number): Promise<UsuarioSchema | null>;

  criar(usuario: CriarUsuarioDTO): void;

  atualizar(id: number, dadosNovos: AtualizarUsuarioDTO): void;

  deletar(id: number): void;
}

export default UsuarioRepositorioInterface;