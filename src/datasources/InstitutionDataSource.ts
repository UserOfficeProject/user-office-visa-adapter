import { Employer } from '../models/Employer';
import { CountryPayload, InstitutionPayload } from '../types/proposal';

export interface InstitutionDataSource {
  create(
    institution: InstitutionPayload,
    country: CountryPayload
  ): Promise<Employer>;
}
