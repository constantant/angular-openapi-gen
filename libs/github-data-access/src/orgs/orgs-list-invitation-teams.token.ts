import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListInvitationTeamsParams =
  paths['/orgs/{org}/invitations/{invitation_id}/teams']['get']['parameters']['query'];

export type OrgsListInvitationTeamsResponse =
  paths['/orgs/{org}/invitations/{invitation_id}/teams']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_INVITATION_TEAMS = new InjectionToken<
  (
    org: string,
    invitationId: string,
    params?:
      | OrgsListInvitationTeamsParams
      | (() => OrgsListInvitationTeamsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListInvitationTeamsResponse>>
>('ORGS_LIST_INVITATION_TEAMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      invitationId: string,
      params?:
        | OrgsListInvitationTeamsParams
        | (() => OrgsListInvitationTeamsParams | undefined),
    ) =>
      httpResource<OrgsListInvitationTeamsResponse>(() => ({
        url: `${base}/orgs/${org}/invitations/${invitationId}/teams`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
