import CustomError from './custom-error.error';

class UnauthorizedException extends CustomError {
  constructor (mensagem: string = 'Acesso não atuorizado.') {
    super(mensagem, 401);
  }
}

export default UnauthorizedException;
