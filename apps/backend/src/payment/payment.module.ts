import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
    providers: [PrismaService, PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
