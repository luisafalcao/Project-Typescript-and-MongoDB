import { Schema } from "mongoose";

export const FilmeSchema = new Schema({
    titulo: { type: String, required: true },
    elenco: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    diretor: { type: String },
})