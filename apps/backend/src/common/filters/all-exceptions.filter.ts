import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // Determinar el código de estado y la estructura del error
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = exception instanceof HttpException
      ? exception.getResponse()
      : { message: 'Error interno del servidor.' };

    const message = (errorResponse as any).message || 'Error interno del servidor.';
    const errorName = exception instanceof HttpException
      ? (exception as any).name
      : 'InternalServerError';

    // Construir el cuerpo de la respuesta de error estandarizada
    response
      .status(status)   
      .json({
        success: false,
        statusCode: status,
        message: Array.isArray(message) ? message.join(', ') : message, // Manejar errores de validación de clase
        error: errorName,
      });
  }
}