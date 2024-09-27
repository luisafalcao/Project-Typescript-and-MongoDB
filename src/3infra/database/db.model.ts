import { injectable } from "inversify";
import mongoose from "mongoose";
import { UsuarioEntity } from "../../1entidades/usuarios.entity";
import { UsuarioSchema } from "./schemas/usuario.schema";

@injectable()
class DBModel {
    get userModel(): mongoose.Model<UsuarioEntity> {
        return mongoose.model<UsuarioEntity>('User', UsuarioSchema);
    }
}

export default DBModel;
