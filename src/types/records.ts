import { Employer } from '../models/Employer';
import { Instrument } from '../models/Instrument';
import { Proposal } from '../models/Proposal';
import { Role } from '../models/Role';
import { User } from '../models/User';

export interface EmployerRecord {
  readonly id: number;
  readonly country_code: string;
  readonly name: string;
  readonly town: string;
}

export const createEmployerObject = (employer: EmployerRecord) => {
  return new Employer(
    employer.id,
    employer.country_code,
    employer.name,
    employer.town
  );
};
export interface InstrumentRecord {
  readonly id: number;
  readonly name: string;
}

export const createInstrumentObject = (instrument: InstrumentRecord) => {
  return new Instrument(instrument.id, instrument.name);
};

export interface ProposalRecord {
  readonly id: number;
  readonly identifier: string;
  readonly public_at: string;
  readonly summary: string;
  readonly title: string;
}

export const createProposalObject = (proposal: ProposalRecord) => {
  return new Proposal(
    proposal.id,
    proposal.identifier,
    proposal.public_at,
    proposal.summary,
    proposal.title
  );
};
export interface UserRecord {
  readonly id: string;
  readonly activated_at: string;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly instance_quota: string;
  readonly last_seen_at: string;
  readonly affiliation_id: number;
}

export const createUserObject = (user: UserRecord) => {
  return new User(
    user.id,
    user.activated_at,
    user.email,
    user.first_name,
    user.last_name,
    user.instance_quota,
    user.last_seen_at,
    user.affiliation_id
  );
};

export interface RoleRecord {
  readonly id: number;
  readonly description: string;
  readonly name: string;
}

export const createRoleObject = (role: RoleRecord) => {
  return new Role(role.id, role.description, role.name);
};

export interface RoleUser {
  readonly role_id: number;
  readonly user_id: number;
}
