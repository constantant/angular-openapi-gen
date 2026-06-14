import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListOrgRoleTeamsParams =
  paths['/orgs/{org}/organization-roles/{role_id}/teams']['get']['parameters']['query'];

export type OrgsListOrgRoleTeamsResponse =
  paths['/orgs/{org}/organization-roles/{role_id}/teams']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ORG_ROLE_TEAMS = new InjectionToken<
  (
    org: string,
    roleId: string,
    params?:
      | OrgsListOrgRoleTeamsParams
      | (() => OrgsListOrgRoleTeamsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListOrgRoleTeamsResponse>>
>('ORGS_LIST_ORG_ROLE_TEAMS');

export function provideOrgsListOrgRoleTeams(): FactoryProvider {
  return {
    provide: ORGS_LIST_ORG_ROLE_TEAMS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        roleId: string,
        params?:
          | OrgsListOrgRoleTeamsParams
          | (() => OrgsListOrgRoleTeamsParams | undefined),
      ) =>
        httpResource<OrgsListOrgRoleTeamsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/organization-roles/${roleId}/teams`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
