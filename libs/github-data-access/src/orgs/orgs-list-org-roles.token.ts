import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListOrgRolesResponse =
  paths['/orgs/{org}/organization-roles']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ORG_ROLES = new InjectionToken<
  (org: string) => ReturnType<typeof httpResource<OrgsListOrgRolesResponse>>
>('ORGS_LIST_ORG_ROLES');

export function provideOrgsListOrgRoles(): FactoryProvider {
  return {
    provide: ORGS_LIST_ORG_ROLES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<OrgsListOrgRolesResponse>(() => ({
          url: `${base}/orgs/${org}/organization-roles`,
        }));
    },
  };
}
