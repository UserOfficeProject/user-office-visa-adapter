import knex from 'knex';

import { syncProposalData } from '../queue/messageHandlers/proposal';

const synchronization = async () => {
  const conString = `postgres://${process.env.USEROFFICE_DB_USERNAME}:${
    process.env.USEROFFICE_DB_PASSWORD
  }@127.0.0.1:${9090}/${process.env.USEROFFICE_DB_NAME}`;

  const connection = knex({
    client: 'pg',
    connection: conString,
  });

  await connection
    .select(
      connection.raw(
        'to_json(p.*) as proposal, to_json(i.*) as instrument, to_json(c.*) as call'
      )
    )
    .from('proposals as p')
    .join('proposal_statuses as ps', 'p.status_id', 'ps.proposal_status_id')
    .join('instrument_has_proposals as ip', 'p.proposal_pk', 'ip.proposal_pk')
    .join('instruments as i', 'ip.instrument_id', 'i.instrument_id')
    .join('call as c', 'p.call_id', 'c.call_id')
    .whereIn('ps.short_code', ['ALLOCATED', 'SCHEDULING'])
    .then(async (proposals) => {
      for (const data of proposals) {
        const instrument = data.instrument;
        const call = data.call;
        const proposal = data.proposal;
        const proposer = await connection
          .select(
            connection.raw(
              'to_json(u.*) as user, to_json(ins.*) as institution, to_json(n.*) as nationality'
            )
          )
          .from('users as u')
          .join('institutions as ins', 'u.organisation', 'ins.institution_id')
          .join('nationalities as n', 'u.nationality', 'n.nationality_id')
          .where({
            user_id: proposal.proposer_id,
          })
          .first()
          .then((data) => {
            if (!data) return {};
            const user = data.user;
            const institution = data.institution;
            const nationality = data.nationality;

            return {
              firstName: user.firstname,
              lastName: user.lastname,
              email: user.email,
              id: user.user_id.toString(),
              oidcSub: user.oidc_sub,
              oauthIssuer: user.oauth_issuer,
              institution: {
                id: institution.institution_id,
                name: institution.institution,
                country: institution.country_id,
                verified: institution.verified,
              },
              country: {
                countryId: nationality.nationality_id,
                country: nationality.nationality,
              },
            };
          })
          .catch((err) => {
            console.error(err);
          });

        const members = await connection
          .select(
            connection.raw(
              'to_json(u.*) as user, to_json(ins.*) as institution, to_json(n.*) as nationality'
            )
          )
          .from('users as u')
          .join('proposal_user as up', 'u.user_id', 'up.user_id')
          .join('nationalities as n', 'u.nationality', 'n.nationality_id')
          .join('institutions as ins', 'u.organisation', 'ins.institution_id')
          .where({
            'up.proposal_pk': proposal.proposal_pk,
          })
          .then((allData) => {
            return allData.map((data) => {
              const user = data.user;
              const institution = data.institution;
              const nationality = data.nationality;

              return {
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                id: user.user_id.toString(),
                oidcSub: user.oidc_sub,
                oauthIssuer: user.oauth_issuer,
                institution: {
                  id: institution.institution_id,
                  name: institution.institution,
                  country: institution.country_id,
                  verified: institution.verified,
                },
                country: {
                  countryId: nationality.nationality_id,
                  country: nationality.nationality,
                },
              };
            });
          })
          .catch((err) => {
            console.error(err);
          });

        const messageData = {
          proposalPk: proposal.proposal_pk,
          shortCode: proposal.proposal_id,
          instrument: instrument
            ? { id: instrument.instrument_id, shortCode: instrument.short_code }
            : undefined,
          title: proposal.title,
          abstract: proposal.abstract,
          callId: call.call_id,
          allocatedTime: getSecondsPerAllocationTimeUnit(
            proposal.management_time_allocation,
            call.allocation_time_unit
          ),
          instrumentId: instrument?.instrument_id,
          proposer: proposer ?? undefined,
          members: members,
        };

        syncProposalData(messageData);
      }
    });
};
const getSecondsPerAllocationTimeUnit = (
  timeAllocation: number,
  unit: AllocationTimeUnits
) => {
  // NOTE: Default AllocationTimeUnit is 'Day'. The UI supports Days and Hours.
  switch (unit) {
    case AllocationTimeUnits.Hour:
      return timeAllocation * 60 * 60;
    default:
      return timeAllocation * 24 * 60 * 60;
  }
};
enum AllocationTimeUnits {
  Day = 'day',
  Hour = 'hour',
}

export default synchronization;
