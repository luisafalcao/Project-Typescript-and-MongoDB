// import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import { ContatoSchema } from "./contato.schema";
import { FilmeSchema } from "./filme.schema";

// export type UsuarioSchemaDriver = {
//     _id?: ObjectId;
//     id: number;
//     nome: string;
//     ativo?: boolean,
//     contato?: Record<string, unknown>
// }

// schema do mongoose
export const UsuarioSchema: Schema = new Schema({
    id: { type: Number, require: true, unique: true },
    nome: { type: String, require: true },
    ativo: { type: Boolean, default: false },
    contato: ContatoSchema,
    filmes: [FilmeSchema]
});