import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
