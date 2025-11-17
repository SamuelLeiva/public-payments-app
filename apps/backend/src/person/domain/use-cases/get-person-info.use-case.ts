import { PersonRepository } from "../ports/person.repository";

export class GetPersonInfoUseCase {
    constructor(private personRepository: PersonRepository) {}

    async execute(id: string) {
        return this.personRepository.findById(id);
    }
}