import CustomError from './custom-error.error';

class MongoDBException extends CustomError {
  constructor(mensagem: string = 'Erro de conexão') {
    super(mensagem, 500);
  }
}

export default MongoDBException;
