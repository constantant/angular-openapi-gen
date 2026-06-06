import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListOrgRoleUsersParams =
  paths['/orgs/{org}/organization-roles/{role_id}/users']['get']['parameters']['query'];

export type OrgsListOrgRoleUsersResponse =
  paths['/orgs/{org}/organization-roles/{role_id}/users']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ORG_ROLE_USERS = new InjectionToken<
  (
    org: string,
    roleId: string,
    params?:
      | OrgsListOrgRoleUsersParams
      | (() => OrgsListOrgRoleUsersParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListOrgRoleUsersResponse>>
>('ORGS_LIST_ORG_ROLE_USERS');

export function provideOrgsListOrgRoleUsers(): FactoryProvider {
  return {
    provide: ORGS_LIST_ORG_ROLE_USERS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        roleId: string,
        params?:
          | OrgsListOrgRoleUsersParams
          | (() => OrgsListOrgRoleUsersParams | undefined),
      ) =>
        httpResource<OrgsListOrgRoleUsersResponse>(() => ({
          url: `${base}/orgs/${org}/organization-roles/${roleId}/users`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
