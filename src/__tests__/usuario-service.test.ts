import {UsarioSchema} from '../infra/usuarioSchema';
import UsuarioRepositorio from '../infra/usuarioRepositorio';
import UsuarioService from '../usuario-service';

jest.mock('../infra/usuarioRepositorio');

describe('UsuarioService', () => {
    let usuarioRepositorio: jest.Mocked<UsuarioRepositorio>;
    let usuarioService : UsuarioService;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepositorio() as jest.Mocked<UsuarioRepositorio>;
        usuarioService = new UsuarioService(usuarioRepositorio);
    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('buscarPorId',() => {
        it('deve retornar o usuario correspondente ao ID fornecido', () => {
            const mockUsuario: UsarioSchema = { id: 1, nome: 'Usuario Falso', ativo: true };

            usuarioRepositorio.buscaPorId.mockReturnValue(mockUsuario);

            const usuario = usuarioService.buscarId(1);

            expect(usuarioRepositorio.buscaPorId).toHaveBeenCalledWith(1);

            expect(usuario).toEqual(mockUsuario);

        });

        it('deve retornar um erro se o usuário não for encontrado', () =>{
            usuarioRepositorio.buscaPorId.mockReturnValue(undefined);

            expect(() => usuarioService.buscarId(999)).toThrow('Usuario não encontrado.');
            expect(usuarioRepositorio.buscaPorId).toHaveBeenCalledWith(999);

        });
    })

});