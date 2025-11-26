import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PersonService {
    constructor(private prisma: PrismaService) {
        
    }

    async findPersonById(id: string) {
        const person = await this.prisma.person.findUnique({
            where: { id }
        });

        if(!person) {
            throw new NotFoundException(`Persona con ID ${id} no encontrada.`);
        }
        return person;
    }
}
