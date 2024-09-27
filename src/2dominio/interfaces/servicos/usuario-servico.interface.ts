import { UsuarioEntity } from "../../../1entidades/usuarios.entity";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../../dtos/usuario.dto";

interface UsuarioServiceInterface {
    buscarTodos(): Promise<(UsuarioEntity | undefined)[]>;
    buscarPorId(id: number): Promise<UsuarioEntity | undefined>;
    criar(usuario: CriarUsuarioDTO): Promise<void>;
    atualizar(id: string, usuario: AtualizarUsuarioDTO): Promise<void>;
    deletar(id: number): Promise<void>;
}

export default UsuarioServiceInterface;