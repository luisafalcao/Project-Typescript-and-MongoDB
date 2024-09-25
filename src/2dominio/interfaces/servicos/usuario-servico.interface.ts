import { UsuarioSchema } from "../../../3infra/usuario.schema";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../../dtos/usuario.dto";

interface UsuarioServiceInterface {
    buscarPorId(id: number): UsuarioSchema;
    buscarTodos (): UsuarioSchema[];
    criar (usuario: CriarUsuarioDTO): void ;
    atualizar (id:number, usuario: AtualizarUsuarioDTO): void ;
    deletar (id:number): void ;
}

export default UsuarioServiceInterface;