import { Container } from "inversify";
import UsuarioRepositorio from "./repositorios/usuario-mongoose.repositorio";
import UsuarioController from "../4api/controllers/usuario.controller";
import UsuarioRepositorioInterface from "../2dominio/interfaces/repositorios/usuario-repositorio.interface";
import UsuarioService from "../2dominio/servicos/usuario.service";
import UsuarioServiceInterface from "../2dominio/interfaces/servicos/usuario-servico.interface";
import DBModel from "./database/db.model";
import "reflect-metadata";

var container = new Container();
container
  .bind<DBModel>('DBModel')
  .to(DBModel).inRequestScope();
container
  .bind<UsuarioRepositorioInterface>('UsuarioRepositorio')
  .to(UsuarioRepositorio).inRequestScope();
container
  .bind<UsuarioServiceInterface>('UsuarioService')
  .to(UsuarioService).inRequestScope();
container
  .bind<UsuarioController>('UsuarioController')
  .to(UsuarioController).inRequestScope();

export default container;