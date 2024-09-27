import { UsuarioSchemaDriver } from "./schemas/usuario.schema";

interface DBSchema {
    users: UsuarioSchemaDriver[]
}

export default DBSchema;
