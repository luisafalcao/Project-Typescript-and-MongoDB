import { Response, Request, NextFunction } from "express";
import NotFoundException from "../../2dominio/exceptions/mongo-db.exception";

const rotaNaoEncontradaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundException(`Rota não encontrada - ${req.originalUrl}`);
    next(error)
}

export default rotaNaoEncontradaMiddleware