import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_REVOKE_ORG_ROLE_USER = new InjectionToken<
  (
    org: string,
    username: string,
    roleId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_REVOKE_ORG_ROLE_USER');

export function provideOrgsRevokeOrgRoleUser(): FactoryProvider {
  return {
    provide: ORGS_REVOKE_ORG_ROLE_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, username: string, roleId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/organization-roles/users/${username}/${roleId}`,
          method: 'DELETE',
        }));
    },
  };
}
