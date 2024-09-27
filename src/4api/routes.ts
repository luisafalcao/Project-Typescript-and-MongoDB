import { Router } from 'express';
import UsuarioController from './controllers/usuario.controller';
import container from '../3infra/inversify.config';

const routes = Router();

const usuarioController = container.get<UsuarioController>('UsuarioController');

routes.use('/usuarios', usuarioController.router);

export default routes;
