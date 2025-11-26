import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentService;
  let prisma: PrismaService;

  // Mock del PrismaService
  const mockPrismaService = {
    payment: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPaymentById', () => {
    it('debería retornar el pago si existe', async () => {
      const mockPayment = { id: '789', amount: 150, status: 'PAID' };

      mockPrismaService.payment.findUnique.mockResolvedValueOnce(mockPayment);

      const result = await service.findPaymentById('789');

      expect(result).toEqual(mockPayment);

      expect(prisma.payment.findUnique).toHaveBeenCalledWith({
        where: { id: '789' },
      });
    });

    it('debería lanzar NotFoundException si el pago no existe', async () => {
      mockPrismaService.payment.findUnique.mockResolvedValueOnce(null);

      await expect(service.findPaymentById('789')).rejects.toThrow(NotFoundException);

      await expect(service.findPaymentById('789')).rejects.toThrow(
        'Pago con ID 789 no encontrado.',
      );
    });
  });
});
