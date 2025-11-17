import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';

@Injectable()
export class PersonService {
    constructor(private prisma: DatabaseService) {

    }

    async findPersonById(id: string) {
        return this.prisma.person.findUnique({
            where: { id }
        });
    }
}
