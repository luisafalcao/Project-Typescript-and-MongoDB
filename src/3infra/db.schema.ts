import { UsuarioSchema } from './usuario.schema';

interface DBSchema {
    users: UsuarioSchema[]
}

export default DBSchema;
