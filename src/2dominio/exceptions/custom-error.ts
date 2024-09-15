abstract class CustomError extends Error {
  public statusCode: number;

  constructor (mensagem: string, statusCode: number) {
    super(mensagem);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
