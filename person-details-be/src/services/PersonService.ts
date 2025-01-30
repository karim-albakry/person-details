import { IPersonRepository } from "../repositories/IPersonRepository";

export class PersonService {
  private csvRepository: IPersonRepository;
  private sqlRepository: IPersonRepository;

  constructor(csvRepo: IPersonRepository, sqlRepo: IPersonRepository) {
    this.csvRepository = csvRepo;
    this.sqlRepository = sqlRepo;
  }

  async getAllPersons(
    name?: string,
    phone?: string,
    address?: string,
    country?: string
  ): Promise<any[]> {
    const csvData = await this.csvRepository.getPersons(name, phone, address, country);
    const sqlData = await this.sqlRepository.getPersons(name, phone, address, country);
    
    return [...csvData, ...sqlData];
  }
}
