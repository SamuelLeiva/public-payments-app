import { Controller, Get, Param } from '@nestjs/common';
import { Person as PersonModel } from '@prisma/client';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService) { }
    @Get(':id')
      async getPersonById(@Param('id') id: string): Promise<PersonModel> {
        return this.personService.findPersonById(id);
      }
    
}
