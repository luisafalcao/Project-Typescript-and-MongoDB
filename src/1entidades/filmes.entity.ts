import { ObjectId } from "mongoose";

class FilmeEntity {
    constructor(
        public titulo: string,
        public elenco?: ObjectId[],
        public diretor?: string,
        public _id?: string
    ) { }
}

export default FilmeEntity