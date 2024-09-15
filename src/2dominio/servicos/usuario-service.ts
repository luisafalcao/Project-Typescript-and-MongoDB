import { UsuarioSchema } from '../../3infra/usuario-schema';
import NotFountException from '../exceptions/not-fount-exception';
import UsuarioRepositorioInterface from '../interfaces/usuario-interface-repository';

class UsuarioService {
    private readonly usuarioRepositorio: UsuarioRepositorioInterface;
    constructor(usuarioRepositorio: UsuarioRepositorioInterface) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    buscarPorId(id: number): UsuarioSchema {
        const usuario = this.usuarioRepositorio.buscaPorId(id);
        if (!usuario) {
            throw new NotFountException('Usuario não encontrado.');
        }
        return usuario;
    }
    public buscarTodos(): UsuarioSchema[] {
        return this.usuarioRepositorio.buscaTodos();
    }
    public criar(usuario: UsuarioSchema): void {
        this.usuarioRepositorio.criar(usuario);
    }
    public atualizar(id: number, usuario: UsuarioSchema): void {
        this.usuarioRepositorio.atualizar(id, usuario);
    }
    public deletar(id: number): void {
        this.usuarioRepositorio.deletar(id);
    }
}

export default UsuarioService;
