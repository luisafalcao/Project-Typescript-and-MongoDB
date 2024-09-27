import { UsuarioSchemaDriver } from "../usuario.schema";

interface DBSchema {
    users: UsuarioSchemaDriver[]
}

export default DBSchema;
