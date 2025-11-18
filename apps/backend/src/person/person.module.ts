import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PersonService, PrismaService],
  controllers: [PersonController]
})
export class PersonModule {}
