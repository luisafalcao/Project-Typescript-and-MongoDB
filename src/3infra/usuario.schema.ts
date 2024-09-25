export type UsuarioSchema = {
    id: number;
    nome: string;
    ativo: boolean,
    horasAulas?: bigint,
    contato?: Record<string, unknown>
}
