import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_REVOKE_ORG_ROLE_TEAM = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    roleId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_REVOKE_ORG_ROLE_TEAM');

export function provideOrgsRevokeOrgRoleTeam(): FactoryProvider {
  return {
    provide: ORGS_REVOKE_ORG_ROLE_TEAM,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, teamSlug: string, roleId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/organization-roles/teams/${teamSlug}/${roleId}`,
          method: 'DELETE',
        }));
    },
  };
}
