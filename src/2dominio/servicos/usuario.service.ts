import { inject, injectable } from "inversify";
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from "../dtos/usuario.dto";
import UsuarioRepositorioInterface from "../interfaces/repositorios/usuario-repositorio.interface";
import UsuarioServiceInterface from "../interfaces/servicos/usuario-servico.interface";
import "reflect-metadata";
import NotFoundException from "../exceptions/mongo-db.exception";
import { UsuarioEntity } from "../../1entidades/usuarios.entity";

@injectable()
class UsuarioService implements UsuarioServiceInterface {
    private readonly usuarioRepositorio: UsuarioRepositorioInterface;
    constructor(@inject('UsuarioRepositorio') usuarioRepositorio: UsuarioRepositorioInterface) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    async buscarPorId(id: number): Promise<UsuarioEntity | undefined> {
        const usuario = await this.usuarioRepositorio.buscaPorId(id);
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        return usuario;
    }
    public async buscarTodos(): Promise<(UsuarioEntity | undefined)[]> {
        return await this.usuarioRepositorio.buscarTodos();
    }
    public async criar(usuario: CriarUsuarioDTO): Promise<void> {
        await this.usuarioRepositorio.criar(usuario);
    }
    public async atualizar(id: string, usuario: AtualizarUsuarioDTO): Promise<void> {
        await this.usuarioRepositorio.atualizar(id, usuario);
    }
    public async deletar(id: number): Promise<void> {
        await this.usuarioRepositorio.deletar(id);
    }
}

export default UsuarioService;