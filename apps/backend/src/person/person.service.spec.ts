import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

describe('PersonService', () => {
  let service: PersonService;
  let prisma: PrismaService;

  const mockPrismaService = {
    person: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPersonById', () => {
    it('debería devolver la persona si existe', async () => {
      const mockPerson = { id: '123', name: 'John Doe' };

      mockPrismaService.person.findUnique.mockResolvedValueOnce(mockPerson);

      const result = await service.findPersonById('123');

      expect(result).toEqual(mockPerson);
      expect(prisma.person.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
      });
    });

    it('debería lanzar NotFoundException si la persona no existe', async () => {
      mockPrismaService.person.findUnique.mockResolvedValueOnce(null);

      await expect(service.findPersonById('123')).rejects.toThrow(
        NotFoundException,
      );

      await expect(service.findPersonById('123')).rejects.toThrow(
        'Persona con ID 123 no encontrada.',
      );
    });
  });
});
