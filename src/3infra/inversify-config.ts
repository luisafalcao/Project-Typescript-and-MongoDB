import { Container } from "inversify";
import UsuarioRepositorioInterface from "../2dominio/interfaces/usuario-interface-repository";
import UsuarioRepositorio from "./repositorios/usuario-repositorio";
import UsuarioController from "../4api/controllers/usuario-controller";
import "reflect-metadata";

var container = new Container();
container
  .bind<UsuarioRepositorioInterface>('UsuarioRepositorio')
  .to(UsuarioRepositorio).inRequestScope();
container
  .bind<UsuarioController>('UsuarioController')
  .to(UsuarioController).inRequestScope();

export default container;