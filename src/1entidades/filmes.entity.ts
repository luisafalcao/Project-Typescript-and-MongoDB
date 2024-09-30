import { ObjectId } from "mongoose";

export class FilmeEntity {
    _id?: string;
    id: number;
    titulo: string;
    elenco?: ObjectId[];
    diretor?: string;

    constructor(
        id: number,
        titulo: string,
        elenco?: ObjectId[],
        diretor?: string,
        _id?: string,
    ) {
        this.id = id;
        this.titulo = titulo;
        this.elenco = elenco;
        this.diretor = diretor;
        this._id = _id;
    }
}



export default FilmeEntity