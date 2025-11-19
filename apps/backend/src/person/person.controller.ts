import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Person as PersonModel } from '@prisma/client';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  @Get(':id')
  async getPersonById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PersonModel> {
    return this.personService.findPersonById(id);
  }
}
