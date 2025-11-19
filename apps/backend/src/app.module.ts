import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'
import { PersonModule } from './person/person.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [PersonModule, PaymentModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
