import { injectable } from "inversify";
import mongoose from "mongoose";
import { UsuarioEntity } from "../../1entidades/usuarios.entity";
import { UsuarioSchema } from "./schemas/usuario.schema";
import FilmeEntity from "../../1entidades/filmes.entity";
import { FilmeSchema } from "./schemas/filme.schema";

@injectable()
class DBModel {
    get userModel(): mongoose.Model<UsuarioEntity> {
        return mongoose.model<UsuarioEntity>('User', UsuarioSchema);
    }
    get filmeModel(): mongoose.Model<FilmeEntity> {
        return mongoose.model<FilmeEntity>('Movie', FilmeSchema);
    }
}

export default DBModel;
