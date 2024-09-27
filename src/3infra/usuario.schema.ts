import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { UsuarioEntity } from "../1entidades/usuarios.entity";

export type UsuarioSchemaDriver = {
    _id?: ObjectId;
    id: number;
    nome: string;
    ativo: boolean,
    horasAulas?: bigint,
    contato?: Record<string, unknown>
}

// schema do mongoose
const UsuarioSchema: Schema = new Schema({
    id: { type: Number, require: true, unique: true },
    nome: { type: String, require: true },
    ativo: { type: Boolean, default: false }
})

export const UserModel = mongoose.model<UsuarioEntity>('User', UsuarioSchema);