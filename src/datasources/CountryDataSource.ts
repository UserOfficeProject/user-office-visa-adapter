import { CountryPayload } from '../types/proposal';

export interface CountryDataSource {
  create(country: CountryPayload): Promise<CountryPayload>;
}
