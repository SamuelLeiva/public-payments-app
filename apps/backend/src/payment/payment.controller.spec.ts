import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { NotFoundException } from '@nestjs/common';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPaymentService = {
    findPaymentById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPaymentById', () => {
    it('debería retornar un pago si existe', async () => {
      const mockPayment = {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        amount: 500,
        status: 'PAID',
      };

      mockPaymentService.findPaymentById.mockResolvedValueOnce(mockPayment);

      const result = await controller.getPaymentById(mockPayment.id);

      expect(result).toEqual(mockPayment);

      expect(service.findPaymentById).toHaveBeenCalledWith(mockPayment.id);
    });

    it('debería propagar NotFoundException si el pago no existe', async () => {
      mockPaymentService.findPaymentById.mockRejectedValueOnce(
        new NotFoundException('Pago no encontrado'),
      );

      await expect(
        controller.getPaymentById('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
