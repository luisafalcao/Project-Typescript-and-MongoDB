import { inject, injectable } from "inversify";
import { UsuarioSchema } from "../../3infra/usuario.schema";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../dtos/usuario.dto";
import NotFoundException from "../exceptions/not-found.exception";
import UsuarioRepositorioInterface from "../interfaces/repositorios/usuario-repositorio.interface";
import UsuarioServiceInterface from "../interfaces/servicos/usuario-servico.interface";
import "reflect-metadata";

@injectable()
class UsuarioService implements UsuarioServiceInterface {
    private readonly usuarioRepositorio: UsuarioRepositorioInterface;
    constructor(@inject('UsuarioRepositorio') usuarioRepositorio: UsuarioRepositorioInterface) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    buscarPorId(id: number): UsuarioSchema {
        const usuario = this.usuarioRepositorio.buscaPorId(id);
        if (!usuario) {
            throw new NotFoundException('Usuario não encontrado.');
        }
        return usuario;
    }
    public buscarTodos(): UsuarioSchema[] {
        return this.usuarioRepositorio.buscaTodos();
    }
    public criar(usuario: CriarUsuarioDTO): void {
        this.usuarioRepositorio.criar(usuario);
    }
    public atualizar(id: number, usuario: AtualizarUsuarioDTO): void {
        this.usuarioRepositorio.atualizar(id, usuario);
    }
    public deletar(id: number): void {
        this.usuarioRepositorio.deletar(id);
    }
}

export default UsuarioService;