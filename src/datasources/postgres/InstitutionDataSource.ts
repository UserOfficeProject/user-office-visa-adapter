import { Employer } from '../../models/Employer';
import { CountryPayload, InstitutionPayload } from '../../types/proposal';
import { EmployerRecord, createEmployerObject } from '../../types/records';
import { InstitutionDataSource } from '../InstitutionDataSource';
import database from './database';

export default class PostgresInstitutionDataSource
  implements InstitutionDataSource
{
  private TABLE_NAME = 'employer';

  async create(
    institution: InstitutionPayload,
    country: CountryPayload
  ): Promise<Employer> {
    const institutionExists = await database(this.TABLE_NAME).where({
      name: institution.name,
    });

    if (institutionExists.length > 0) {
      return institutionExists[0];
    }

    // Insert into institution table
    return await database(this.TABLE_NAME)
      .insert({
        id: institution.id,
        name: institution.name,
      })
      .returning(['*'])
      .then((institution: EmployerRecord[]) => {
        return createEmployerObject(institution[0]);
      });
  }
}
