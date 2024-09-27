import UsuarioRepositorio from '../3infra/repositorios/usuario.repositorio';
import UsuarioService from '../2dominio/servicos/usuario.service';
import { UsuarioEntity } from '../1entidades/usuarios.entity';

jest.mock('../3infra/repositorios/usuario.repositorio');

describe('UsuarioService', () => {
    let usuarioRepositorio: jest.Mocked<UsuarioRepositorio>;
    let usuarioService: UsuarioService;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepositorio() as jest.Mocked<UsuarioRepositorio>;
        usuarioService = new UsuarioService(usuarioRepositorio);
    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('buscarPorId', () => {
        it('deve retornar o usuario correspondente ao ID fornecido', async () => {
            const mockUsuario: UsuarioEntity = { id: 1, nome: 'Usuário Falso', ativo: true };

            usuarioRepositorio.buscaPorId.mockResolvedValue(mockUsuario);

            const usuario = await usuarioService.buscarPorId(1);

            expect(usuarioRepositorio.buscaPorId).toHaveBeenCalledWith(1);

            expect(usuario).toEqual(mockUsuario);

        });

        it('deve retornar um erro se o usuário não for encontrado', async () => {
            usuarioRepositorio.buscaPorId.mockResolvedValue(undefined);

            await expect(() => usuarioService.buscarPorId(999)).rejects.toThrow('Usuário não encontrado.');
            expect(usuarioRepositorio.buscaPorId).toHaveBeenCalledWith(999);

        });
    })

});