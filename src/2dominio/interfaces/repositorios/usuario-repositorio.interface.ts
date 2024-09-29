import { UsuarioEntity } from "../../../1entidades/usuarios.entity";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../../dtos/usuario.dto";

interface UsuarioRepositorioInterface {
  buscarTodos(): Promise<(UsuarioEntity | undefined)[]>;
  buscarPorId(id: number): Promise<UsuarioEntity | undefined>;
  criar(usuario: CriarUsuarioDTO): Promise<void>;
  atualizar(id: string, dadosNovos: AtualizarUsuarioDTO): Promise<void>;
  deletar(id: number): Promise<boolean>;
}

export default UsuarioRepositorioInterface;