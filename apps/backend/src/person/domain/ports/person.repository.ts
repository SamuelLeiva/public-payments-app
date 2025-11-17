import { Person } from "../entity/person";

export interface PersonRepository {
    findById(id: string): Promise<Person | null>;
}