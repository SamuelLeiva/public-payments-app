import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { NotFoundException } from '@nestjs/common';

describe('PersonController', () => {
  let controller: PersonController;
  let service: PersonService;

  const mockPersonService = {
    findPersonById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: mockPersonService,
        },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPersonById', () => {
    it('debería retornar una persona si existe', async () => {
      const mockPerson = {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'John Doe',
      };

      mockPersonService.findPersonById.mockResolvedValueOnce(mockPerson);

      const result = await controller.getPersonById(mockPerson.id);

      expect(result).toEqual(mockPerson);
      expect(service.findPersonById).toHaveBeenCalledWith(mockPerson.id);
    });

    it('debería propagar el NotFoundException si la persona no existe', async () => {
      mockPersonService.findPersonById.mockRejectedValueOnce(
        new NotFoundException('Persona no encontrada'),
      );

      await expect(
        controller.getPersonById('11111111-1111-1111-1111-111111111111'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
