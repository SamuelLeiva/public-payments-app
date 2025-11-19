import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) {
            
        }
    
        async findPaymentById(id: string) {
            const payment = await this.prisma.payment.findUnique({
                where: { id }
            });
    
            if(!payment) {
                throw new NotFoundException(`Pago con ID ${id} no encontrado.`);
            }
            return payment;
        }
}
