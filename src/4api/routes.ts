import { Router } from 'express';
import UsuarioController from './controllers/usuario.controller';
import FilmeController from './controllers/usuario.controller';
import container from '../3infra/inversify.config';

const routes = Router();

const usuarioController = container.get<UsuarioController>('UsuarioController');
const filmeController = container.get<FilmeController>('FilmeController');

routes.use('/usuarios', usuarioController.router);
routes.use('/filmes', filmeController.router);

export default routes;
