export interface IPersonRepository {
    getPersons(
        name?: string,
        phone?: string,
        address?: string,
        country?: string
      ): Promise<any[]>;
}