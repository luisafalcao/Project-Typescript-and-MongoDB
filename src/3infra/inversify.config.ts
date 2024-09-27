import { Container } from "inversify";
import UsuarioRepositorio from "./repositorios/usuario-mongoose.repositorio";
import UsuarioController from "../4api/controllers/usuario.controller";
import UsuarioRepositorioInterface from "../2dominio/interfaces/repositorios/usuario-repositorio.interface";
import UsuarioService from "../2dominio/servicos/usuario.service";
import UsuarioServiceInterface from "../2dominio/interfaces/servicos/usuario-servico.interface";
import FilmeRepositorio from "./repositorios/filme.repositorio";
import FilmeController from "../4api/controllers/filme.controller";
import FilmeRepositorioInterface from "../2dominio/interfaces/repositorios/filme-repositorio.interface";
import FilmeService from "../2dominio/servicos/filme.service";
import FilmeServiceInterface from "../2dominio/interfaces/servicos/filme-servico.interface";
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
container
  .bind<FilmeRepositorioInterface>('FilmeRepositorio')
  .to(FilmeRepositorio).inRequestScope();
container
  .bind<FilmeServiceInterface>('FilmeService')
  .to(FilmeService).inRequestScope();
container
  .bind<FilmeController>('FilmeController')
  .to(FilmeController).inRequestScope();

export default container;