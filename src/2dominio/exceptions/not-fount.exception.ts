import CustomError from './custom-error.error';

class NotFountException extends CustomError {
  constructor (mensagem: string = 'Recurso não encontrado') {
    super(mensagem, 404);
  }
}

export default NotFountException;
