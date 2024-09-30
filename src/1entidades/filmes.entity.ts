import { ObjectId } from "mongoose";

export class FilmeEntity {
    _id?: string;
    id: number;
    titulo: string;
    elenco?: ObjectId[];
    diretor?: string;
    ano?: number;

    constructor(
        id: number,
        titulo: string,
        elenco?: ObjectId[],
        diretor?: string,
        _id?: string,
        ano?: number
    ) {
        this.id = id;
        this.titulo = titulo;
        this.elenco = elenco;
        this.diretor = diretor;
        this.ano = ano;
        this._id = _id;
    }
}



export default FilmeEntity