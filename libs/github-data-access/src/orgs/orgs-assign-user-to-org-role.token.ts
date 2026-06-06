import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_ASSIGN_USER_TO_ORG_ROLE = new InjectionToken<
  (
    org: string,
    username: string,
    roleId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_ASSIGN_USER_TO_ORG_ROLE');

export function provideOrgsAssignUserToOrgRole(): FactoryProvider {
  return {
    provide: ORGS_ASSIGN_USER_TO_ORG_ROLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, username: string, roleId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/organization-roles/users/${username}/${roleId}`,
          method: 'PUT',
        }));
    },
  };
}
