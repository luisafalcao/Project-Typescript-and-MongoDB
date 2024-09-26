import { ObjectId } from "mongodb";

export type UsuarioSchema = {
    _id?: ObjectId;
    id: number;
    nome: string;
    ativo: boolean,
    horasAulas?: bigint,
    contato?: Record<string, unknown>
}
