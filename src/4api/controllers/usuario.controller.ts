import { Router, Request, Response } from 'express';
import { AtualizarUsuarioDTO, CriarUsuarioDTO } from '../../2dominio/dtos/usuario.dto';
import { body, param, validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import UsuarioServiceInterface from '../../2dominio/interfaces/servicos/usuario-servico.interface';

@injectable()
class UsuarioController {
  private readonly usuarioService: UsuarioServiceInterface;
  public readonly router: Router = Router();

  constructor(@inject('UsuarioService') usuarioService: UsuarioServiceInterface,
  ) {
    this.usuarioService = usuarioService;
    this.routes();
  }

  routes() {
    this.router.get('/', this.buscarTodos.bind(this));
    this.router.get('/:id',
      [
        param('id').isNumeric().withMessage('O campo "Id" deve ser um número')
      ]
      , this.buscarPorId.bind(this));
    this.router.post('/',
      [
        body('nome')
          .exists().withMessage('O campo "Nome" é obrigatório')
          .isString().withMessage('O campo "Nome" deve ser uma string'),
        body('ativo')
          .exists().withMessage('O campo "Ativo" é obrigatório')
          .isBoolean().withMessage('O campo "Ativo" deve ser um boolean')
      ],
      this.criar.bind(this));
    this.router.patch('/:id',
      [
        body('id')
          .exists().withMessage('O campo "Id" é obrigatório')
          .isString().withMessage('O campo "Id" deve ser uma string')
      ],
      this.atualizar.bind(this));
    this.router.delete('/:id', this.deletar.bind(this));
  }

  /**
    * @swagger
    * /usuarios:
    *   get:
    *     summary: Retorna todos os usuários + qualquer informação extra
    *     tags:
    *       - usuarios
    *     responses:
    *       200:
    *         description: Lista de usuários
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 type: object
    *                 properties:
    *                   id:
    *                     type: string
    *                     example: 1
    *                   nome:
    *                     type: string
    *                     example: João da Silva
    *       401:
    *         description: Não autorizado
    *       500:
    *         description: Erro Interno
    */
  async buscarTodos(req: Request, res: Response): Promise<void> {
    const usuarios = await this.usuarioService.buscarTodos();
    res.json(usuarios);
  }

  async buscarPorId(req: Request, res: Response) {
    const errosValidacao = validationResult(req);

    if (!errosValidacao.isEmpty()) {
      return res.status(400).json({ erros: errosValidacao.array() });
    }

    const id = req.params.id ?? 1;
    const usuario = await this.usuarioService.buscarPorId(+id);
    res.json(usuario);
  }

  async criar(req: Request, res: Response) {
    const errosValidacao = validationResult(req);

    if (!errosValidacao.isEmpty()) {
      return res.status(400).json({ erros: errosValidacao.array() });
    }

    const dadosUsuario: CriarUsuarioDTO = req.body;
    await this.usuarioService.criar(dadosUsuario);
    const usuarios = await this.usuarioService.buscarTodos();
    res.status(201).json(usuarios);
  }

  async atualizar(req: Request, res: Response) {
    const id = req.params.id;
    const dadosNovos: AtualizarUsuarioDTO = req.body;

    await this.usuarioService.atualizar(id, dadosNovos);
    res.json('Usuário atualizado com sucesso!');
  }

  async deletar(req: Request, res: Response) {
    const id = req.params.id;
    await this.usuarioService.deletar(+id);
    res.json('Usuário deletado com sucesso!');
  }
}

export default UsuarioController;
