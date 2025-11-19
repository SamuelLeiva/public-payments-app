import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment as PaymentModel } from '@prisma/client';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get(':id')
  async getPaymentById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PaymentModel> {
    return this.paymentService.findPaymentById(id);
  }
}
