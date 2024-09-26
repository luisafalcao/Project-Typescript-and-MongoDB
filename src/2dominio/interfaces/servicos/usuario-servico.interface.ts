import { UsuarioSchema } from "../../../3infra/usuario.schema";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../../dtos/usuario.dto";

interface UsuarioServiceInterface {
    buscarTodos(): Promise<UsuarioSchema[]>;
    buscarPorId(id: number): Promise<UsuarioSchema>;
    criar(usuario: CriarUsuarioDTO): Promise<void>;
    atualizar(id: string, usuario: AtualizarUsuarioDTO): Promise<void>;
    deletar(id: number): Promise<void>;
}

export default UsuarioServiceInterface;