import { Schema } from "mongoose";
import ContatoVO from "../../../1entidades/vo/contato.vo";

export const ContatoSchema: Schema = new Schema<ContatoVO>({
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: false },
    website: { type: String, required: false },
})