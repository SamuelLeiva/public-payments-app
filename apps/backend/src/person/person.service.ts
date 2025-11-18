import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PersonService {
    constructor(private prisma: PrismaService) {
        
    }

    async findPersonById(id: string) {
        return this.prisma.person.findUnique({
            where: { id }
        });
    }
}
