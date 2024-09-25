import { UsuarioSchema } from "../../../3infra/usuario.schema";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../../dtos/usuario.dto";

interface UsuarioRepositorioInterface {

  buscaTodos (): UsuarioSchema[];

  buscaPorId (id: number): UsuarioSchema | undefined;

  criar (usario: CriarUsuarioDTO): void;

  atualizar (id:number, dadosNovos: AtualizarUsuarioDTO): void;

  deletar (id: number): void;
}

export default UsuarioRepositorioInterface;