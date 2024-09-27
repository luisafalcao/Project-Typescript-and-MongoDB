import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export async function connectToDatabase(): Promise<void> {
    try {
        const CHAVEMONGO = process.env.MONGOOSE_DB_KEY;
        if (!CHAVEMONGO) {
            throw new Error("Chave do DB não encontrada")
        }
        const connectOptions: ConnectOptions = { connectTimeoutMS: 5000 }
        await mongoose.connect(CHAVEMONGO, connectOptions)
        console.log("Conectado ao MongoDB")
    } catch (e) {
        console.error("Erro de conexão ao MongoDB", e);
        process.exit(1)
    }
}

export async function closeDatabaseConnection(): Promise<void> {
    try {
        await mongoose.connection.close();
        console.log("Conexão ao MongoDB encerrada")
    } catch (e) {
        console.error("Erro ao encerrar conexão ao MongoDB", e);
    }
}