import CustomError from './custom-error.error';

class NotFoundException extends CustomError {
  constructor(mensagem: string = 'Recurso não encontrado') {
    super(mensagem, 404);
  }
}

export default NotFoundException;
