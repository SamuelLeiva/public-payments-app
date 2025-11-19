import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()

  // Filtro de manejo de excepciones globales
  app.useGlobalFilters(new AllExceptionsFilter())

  // Interceptores globales
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(3000)
}
bootstrap()
