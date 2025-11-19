import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
  success: boolean;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    return next.handle().pipe(
      map((data) => {
        return {
          // Usar el código de estado que ya estableció NestJS
          statusCode: response.statusCode,
          message:
            request.method === 'POST'
              ? 'Recurso creado con éxito.'
              : 'Operación realizada con éxito.',
          data: data || {}, // Asegúrate de que `data` nunca sea `undefined` o `null`
          success: true,
        };
      }),
    );
  }
}
