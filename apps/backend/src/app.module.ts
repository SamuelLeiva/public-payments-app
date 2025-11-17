import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'
import { PersonModule } from './person/person.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [PersonModule, CoreModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
