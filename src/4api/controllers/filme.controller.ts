import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import asyncHandler from '../utils/async-handler';
import FilmeServiceInterface from '../../2dominio/interfaces/servicos/filme-servico.interface';
import { AtualizarFilmeDTO, CriarFilmeDTO } from '../../2dominio/dtos/filme.dto';
import FilmeEntity from '../../1entidades/filmes.entity';

@injectable()
class FilmeController {
  public readonly router: Router = Router();

  constructor(@inject('FilmeService') public filmeService: FilmeServiceInterface,
  ) {
    // this.filmeService = filmeService;
    this.routes();
  }

  routes() {
    this.router.get('/', asyncHandler(this.buscarTodos.bind(this)));
    this.router.post('/',
      [
        body('titulo')
          .exists().withMessage('O campo "Título" é obrigatório')
          .isString().withMessage('O campo "Título" deve ser uma string'),
        body('diretor')
          .isString().withMessage('O campo "Diretor" deve ser uma string'),
      ],
      asyncHandler(this.criar.bind(this)));
    this.router.patch('/:id',
      [
        body('id')
          .exists().withMessage('O campo "Id" é obrigatório')
          .isString().withMessage('O campo "Id" deve ser uma string')
      ],
      asyncHandler(this.atualizar.bind(this)));
    this.router.delete('/:id', asyncHandler(this.deletar.bind(this)));
    this.router.patch('/adicionar-elenco', asyncHandler(this.adicionarElenco.bind(this)))
  }

  /**
    * @swagger
    * /filmes:
    *   get:
    *     summary: Retorna todos os usuários + qualquer informação extra
    *     tags:
    *       - filmes
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
    *                   titulo:
    *                     type: string
    *                     example: João da Silva
    *       401:
    *         description: Não autorizado
    *       500:
    *         description: Erro Interno
    */

  async adicionarElenco(req: Request, res: Response) {
    const body: { userId: string, movieData: FilmeEntity } = req.body
    const filme = await this.filmeService.adicionarElenco(body.userId, body.movieData)
    res.json(filme)
  }

  async buscarTodos(req: Request, res: Response): Promise<void> {
    const filmes = await this.filmeService.buscarTodos();
    res.json(filmes);
  }

  async criar(req: Request, res: Response) {
    const errosValidacao = validationResult(req);

    if (!errosValidacao.isEmpty()) {
      return res.status(400).json({ erros: errosValidacao.array() });
    }

    const dadosFilme: CriarFilmeDTO = req.body;

    const filme = await this.filmeService.criar(dadosFilme);
    res.status(201).json(filme);
  }

  async atualizar(req: Request, res: Response) {
    const id = req.params.id;
    const dadosNovos: AtualizarFilmeDTO = req.body;

    await this.filmeService.atualizar(id, dadosNovos);
    res.json('Filme atualizado com sucesso!');
  }

  async deletar(req: Request, res: Response) {
    const id = req.params.id;
    await this.filmeService.deletar(Number(id));
    res.json('Filme deletado com sucesso!');
  }
}

export default FilmeController;
