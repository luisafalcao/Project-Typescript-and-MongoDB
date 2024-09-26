import { inject, injectable } from "inversify";
import { UsuarioSchema } from "../../3infra/usuario.schema";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../dtos/usuario.dto";
import UsuarioRepositorioInterface from "../interfaces/repositorios/usuario-repositorio.interface";
import UsuarioServiceInterface from "../interfaces/servicos/usuario-servico.interface";
import "reflect-metadata";
import NotFoundException from "../exceptions/mongo-db.exception";

@injectable()
class UsuarioService implements UsuarioServiceInterface {
    private readonly usuarioRepositorio: UsuarioRepositorioInterface;
    constructor(@inject('UsuarioRepositorio') usuarioRepositorio: UsuarioRepositorioInterface) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    async buscarPorId(id: number): Promise<UsuarioSchema> {
        const usuario = await this.usuarioRepositorio.buscaPorId(id);
        if (!usuario) {
            throw new NotFoundException('Usuario não encontrado.');
        }
        return usuario;
    }
    public async buscarTodos(): Promise<UsuarioSchema[]> {
        return await this.usuarioRepositorio.buscarTodos();
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