import { ObjectId } from "mongoose";

export class FilmeEntity {
    id: number;
    titulo: string;
    elenco?: ObjectId[];
    diretor?: string;

    constructor(
        id: number,
        titulo: string,
        elenco?: ObjectId[],
        diretor?: string,
    ) {
        this.id = id;
        this.titulo = titulo;
        this.elenco = elenco;
        this.diretor = diretor;
    }
}



export default FilmeEntity